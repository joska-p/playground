#!/usr/bin/env python3
"""Apply community labels to graph visualization files.
Designed for CI/CD - fails hard with clear errors, never silently.
"""

import json
import os
import re
import sys
import traceback
from collections import defaultdict


def log(msg, level="INFO"):
    """Print log messages with level indicators."""
    prefix = {"INFO": "✓", "WARN": "⚠", "ERROR": "✗"}.get(level, "•")
    output = sys.stderr if level == "ERROR" else sys.stdout
    print(f"{prefix} {msg}", file=output)


def derive_community_names(graph_data):
    """Auto-derive meaningful community names from graph.json structure.

    Groups nodes by community ID and generates names based on source directories.
    """
    communities = defaultdict(list)

    # Group nodes by community
    for node in graph_data.get("nodes", []):
        cid = str(node.get("community", ""))
        if cid:
            communities[cid].append(node)

    labels = {}
    for cid, nodes in communities.items():
        # Extract unique source paths
        paths = set()
        for node in nodes:
            source = node.get("source_file", "")
            if source:
                # Extract top-level directory (e.g., "packages/ui", "apps/playground")
                parts = source.split("/")
                if len(parts) >= 2:
                    paths.add(f"{parts[0]}/{parts[1]}")

        # Generate name from paths
        if paths:
            names = [p.split("/")[-1] for p in sorted(paths)]
            labels[cid] = " + ".join(names)
        else:
            labels[cid] = f"Community {cid}"

    return labels


def update_graph_json(json_path, labels):
    """Update graph.json with community labels."""
    with open(json_path, "r") as f:
        data = json.load(f)

    # Update legend if present
    if "legend" in data:
        for item in data["legend"]:
            cid = str(item.get("cid", ""))
            if cid in labels:
                item["label"] = labels[cid]

    # Update nodes
    updated_count = 0
    if "nodes" in data:
        for node in data["nodes"]:
            cid = str(node.get("community", ""))
            if cid in labels:
                node["community_name"] = labels[cid]
                updated_count += 1

    # Write back
    with open(json_path, "w") as f:
        json.dump(data, f, indent=2)

    return updated_count


def update_graph_html(html_path, labels):
    """Update graph.html with community labels using robust regex."""
    with open(html_path, "r") as f:
        content = f.read()

    # Replace in LEGEND constant
    def replace_legend(match):
        try:
            legend_json = json.loads(match.group(1))
            for item in legend_json:
                cid = str(item.get("cid", ""))
                if cid in labels:
                    item["label"] = labels[cid]
            return f"const LEGEND = {json.dumps(legend_json)};"
        except json.JSONDecodeError as e:
            log(f"Failed to parse LEGEND JSON: {e}", "ERROR")
            raise

    content = re.sub(
        r"const LEGEND = (\[[\s\S]*?\]);",
        replace_legend,
        content,
        flags=re.DOTALL,
    )

    # Replace in RAW_NODES constant
    def replace_nodes(match):
        try:
            nodes_json = json.loads(match.group(1))
            for node in nodes_json:
                cid = str(node.get("community", ""))
                if cid in labels:
                    node["community_name"] = labels[cid]
            return f"const RAW_NODES = {json.dumps(nodes_json)};"
        except json.JSONDecodeError as e:
            log(f"Failed to parse RAW_NODES JSON: {e}", "ERROR")
            raise

    content = re.sub(
        r"const RAW_NODES = (\[[\s\S]*?\]);",
        replace_nodes,
        content,
        flags=re.DOTALL,
    )

    # Update stats line if present (e.g., "42 communities")
    # Keep the count but ensure it's accurate
    community_count = len(set(labels.keys()))
    content = re.sub(
        r"(\d+) communities",
        f"{community_count} communities",
        content,
    )

    with open(html_path, "w") as f:
        f.write(content)

    return True


def validate_outputs(json_path, html_path):
    """Validate that outputs are still valid after modification."""
    # Validate graph.json
    try:
        with open(json_path, "r") as f:
            data = json.load(f)
        log(f"graph.json is valid JSON ({len(data.get('nodes', []))} nodes)")
    except (json.JSONDecodeError, IOError) as e:
        log(f"graph.json validation failed: {e}", "ERROR")
        raise

    # Validate graph.html
    try:
        with open(html_path, "r") as f:
            content = f.read()
        if "const RAW_NODES" not in content:
            raise ValueError("Missing RAW_NODES in HTML")
        if "const LEGEND" not in content:
            raise ValueError("Missing LEGEND in HTML")
        log("graph.html structure is valid")
    except (IOError, ValueError) as e:
        log(f"graph.html validation failed: {e}", "ERROR")
        raise


def apply_labels():
    """Main function to apply community labels."""
    try:
        # Determine working directory (CI compatibility)
        script_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(script_dir)

        # Allow override via environment variable
        project_root = os.environ.get("PROJECT_ROOT", project_root)
        os.chdir(project_root)

        log(f"Working directory: {os.getcwd()}")

        # Paths
        json_path = "graphify-out/graph.json"
        html_path = "graphify-out/graph.html"
        labels_path = "graphify-out/.graphify_labels.json"

        # Load or derive labels
        if os.path.exists(labels_path):
            log(f"Using custom labels from {labels_path}")
            with open(labels_path, "r") as f:
                labels = json.load(f)
        else:
            log("Auto-deriving community labels from graph structure")
            if not os.path.exists(json_path):
                log(f"graph.json not found at {json_path}", "ERROR")
                sys.exit(1)
            with open(json_path, "r") as f:
                graph_data = json.load(f)
            labels = derive_community_names(graph_data)
            log(f"Derived {len(labels)} community labels")

            # Save derived labels for inspection
            with open("graphify-out/.graphify_labels.json", "w") as f:
                json.dump(labels, f, indent=2, sort_keys=True)
            log("Saved derived labels to .graphify_labels.json")

        # Apply to graph.json
        if os.path.exists(json_path):
            updated = update_graph_json(json_path, labels)
            log(f"Updated {json_path} ({updated} nodes labeled)")
        else:
            log(f"Skipping {json_path} (not found)", "WARN")

        # Apply to graph.html
        if os.path.exists(html_path):
            update_graph_html(html_path, labels)
            log(f"Updated {html_path}")
        else:
            log(f"Skipping {html_path} (not found)", "WARN")

        # Validate outputs
        if os.path.exists(json_path) and os.path.exists(html_path):
            validate_outputs(json_path, html_path)

        log("Successfully applied community labels")

    except Exception as e:
        log(f"Failed to apply labels: {e}", "ERROR")
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    apply_labels()
