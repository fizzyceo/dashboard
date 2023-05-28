def locate_lob(container_x, container_y, zone_width, zone_height, lobs):
    max_accuracy = 0
    best_lob = None

    for lob in lobs:
        lob_center_x = lob['center_x']
        lob_center_y = lob['center_y']
        lob_width = lob['width']
        lob_height = lob['height']

        # Check if the container is within the boundaries of the current lob
        if (
            lob_center_x - lob_width / 2 <= container_x <= lob_center_x + lob_width / 2 and
            lob_center_y - lob_height / 2 <= container_y <= lob_center_y + lob_height / 2
        ):
            # Calculate the accuracy of the match
            accuracy = lob_width * lob_height / (zone_width * zone_height)

            # Update the best lob if the accuracy is higher
            if accuracy > max_accuracy:
                max_accuracy = accuracy
                best_lob = lob

    return best_lob


# Example usage
container_x = 75
container_y = 35
zone_width = 100
zone_height = 100

lobs = [
    {'center_x': 50, 'center_y': 30, 'width': 30, 'height': 20},
    {'center_x': 80, 'center_y': 40, 'width': 25, 'height': 30},
    {'center_x': 70, 'center_y': 60, 'width': 40, 'height': 35}
]

best_lob = locate_lob(container_x, container_y, zone_width, zone_height, lobs)

if best_lob:
    print("Best Lob:")
    print(f"Lob Center: ({best_lob['center_x']}, {best_lob['center_y']})")
    print(f"Lob Width: {best_lob['width']}")
    print(f"Lob Height: {best_lob['height']}")
else:
    print("Container does not match any lobs.")
