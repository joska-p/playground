import json
import os
import re

def apply_labels():
    labels_path = "graphify-out/.graphify_labels.json"
    if not os.path.exists(labels_path):
        print(f"No labels found at {labels_path}")
        return

    with open(labels_path, 'r') as f:
        labels = json.load(f)

    # Apply to graph.json
    json_path = "graphify-out/graph.json"
    if os.path.exists(json_path):
        with open(json_path, 'r') as f:
            data = json.load(f)
        
        # Update legend
        if 'legend' in data:
            for item in data['legend']:
                cid = str(item.get('cid'))
                if cid in labels:
                    item['label'] = labels[cid]
        
        # Update nodes
        if 'nodes' in data:
            for node in data['nodes']:
                cid = str(node.get('community'))
                if cid in labels:
                    node['community_name'] = labels[cid]
        
        with open(json_path, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"Updated {json_path}")

    # Apply to graph.html
    html_path = "graphify-out/graph.html"
    if os.path.exists(html_path):
        with open(html_path, 'r') as f:
            content = f.read()
        
        # Replace in LEGEND constant
        def replace_legend(match):
            legend_json = json.loads(match.group(1))
            for item in legend_json:
                cid = str(item.get('cid'))
                if cid in labels:
                    item['label'] = labels[cid]
            return f"const LEGEND = {json.dumps(legend_json)};"

        content = re.sub(r'const LEGEND = (\[.*?\]);', replace_legend, content, flags=re.DOTALL)

        # Replace in RAW_NODES constant
        def replace_nodes(match):
            nodes_json = json.loads(match.group(1))
            for node in nodes_json:
                cid = str(node.get('community'))
                if cid in labels:
                    node['community_name'] = labels[cid]
            return f"const RAW_NODES = {json.dumps(nodes_json)};"

        content = re.sub(r'const RAW_NODES = (\[.*?\]);', replace_nodes, content, flags=re.DOTALL)
        
        # Update stats if present (e.g. "47 communities")
        # This is harder to do precisely without knowing the exact count, 
        # but we could replace "X communities" with "X communities (labeled)" if we wanted.

        with open(html_path, 'w') as f:
            f.write(content)
        print(f"Updated {html_path}")

if __name__ == "__main__":
    apply_labels()
