import argparse
import json
import os
import re
import sys
from collections import defaultdict, Counter

def process_graph(json_path=None, html_path=None):
    # Calculate default paths relative to this script's location (one level up)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(script_dir)

    json_path = json_path or os.path.join(parent_dir, 'graph.json')
    html_path = html_path or os.path.join(parent_dir, 'graph.html')

    if not os.path.exists(json_path):
        print(f"Error: {json_path} not found. (Current Working Directory: {os.getcwd()})")
        sys.exit(1)

    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except (json.JSONDecodeError, IOError) as e:
        print(f"Error reading JSON: {e}")
        sys.exit(1)

    nodes = data.get('nodes', [])
    links = data.get('links', [])

    # 1. Calculate degrees (how many connections each node has)
    degrees = Counter()
    for link in links:
        degrees[link.get('source')] += 1
        degrees[link.get('target')] += 1

    # 2. Group nodes by community/group ID
    communities = defaultdict(list)
    for node in nodes:
        # Detect community key (usually 'group' or 'community')
        comm_id = node.get('group') if node.get('group') is not None else node.get('community', 0)
        communities[comm_id].append(node)

    # 3. Determine a 'meaningful name' for each community
    # Heuristic: The label of the most connected node in that community
    community_map = {}
    for comm_id, member_nodes in communities.items():
        if not member_nodes:
            continue
            
        # Find node with highest degree in this specific group
        # Use .get('id') and default to 0 degree if missing
        representative_node = max(member_nodes, key=lambda n: degrees.get(n.get('id'), 0))
        
        # Get the best possible label
        raw_name = representative_node.get('label') or representative_node.get('name') or str(comm_id)
        community_map[comm_id] = f"Community: {raw_name}"

    # 4. Update nodes with the new community names
    for node in nodes:
        comm_id = node.get('group') if node.get('group') is not None else node.get('community', 0)
        node['community_name'] = community_map.get(comm_id, f"Group {comm_id}")

    # Save updated JSON
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
    print(f"Successfully updated {json_path} with community names.")

    # 5. Modify graph.html to use the new community_name field
    if os.path.exists(html_path):
        with open(html_path, 'r', encoding='utf-8') as f:
            html_content = f.read()

        # Replace common D3/Vis patterns that reference the group ID
        # We look for logic that typically sets tooltips or labels
        original_html = html_content
        
        # Replace d.group or d.community with d.community_name in common JS patterns
        html_content = html_content.replace('d.group', 'd.community_name')
        html_content = html_content.replace('d.community', 'd.community_name')
        
        # If the HTML uses a title attribute for tooltips, ensure it's updated
        if original_html != html_content:
            with open(html_path, 'w', encoding='utf-8') as f:
                f.write(html_content)
            print(f"Successfully updated {html_path} to reference community names.")
        else:
            print(f"Note: No automatic changes made to {html_path}. You may need to manually update your JS template to use 'd.community_name'.")
    else:
        print(f"Warning: {html_path} not found. Only JSON was updated.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Update graph community names.')
    parser.add_argument('--json', help='Path to the graph.json file')
    parser.add_argument('--html', help='Path to the graph.html file')
    args = parser.parse_args()
    
    process_graph(json_path=args.json, html_path=args.html)