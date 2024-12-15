
antennas = {}
area = []
with open('input.txt') as file:
    lines = file.readlines()
    bound_row = len(lines)
    bound_column = len(lines[0].strip())
    for row, line in enumerate(lines):
        area.append([])
        for column, position in enumerate(line.strip()):
            area[row].append(position)
            if position != '.':
                if position not in antennas:
                    antennas[position] = [(row, column)]
                else:
                    antennas[position].append((row, column))


# PART ONE
antinodes = set()
for antenna, coord_list in antennas.items():
    for i in range(len(coord_list)):
        for j in range(i+1, len(coord_list)):
            point1 = (
                2*coord_list[i][0] - coord_list[j][0],
                2*coord_list[i][1] - coord_list[j][1]
            )
            point2 = (
                2*coord_list[j][0] - coord_list[i][0],
                2*coord_list[j][1] - coord_list[i][1]
            )

            if (
                0 <= point1[0] < bound_row and
                0 <= point1[1] < bound_column
            ):
                antinodes.add(point1)

            if (
                0 <= point2[0] < bound_row and
                0 <= point2[1] < bound_column
            ):
                antinodes.add(point2)

print(len(antinodes))

## PART TWO
antinodes = set()
for antenna, coord_list in antennas.items():
    for i in range(len(coord_list)):
        ## add antennas as well
        antinodes.add(coord_list[i])
        for j in range(i+1, len(coord_list)):
            vector = (
                coord_list[i][0] - coord_list[j][0],
                coord_list[i][1] - coord_list[j][1]
            )

            out_of_bounds = False
            multiplier = 1
            while not out_of_bounds:
                point = (
                    coord_list[i][0] + (multiplier * vector[0]),
                    coord_list[i][1] + (multiplier * vector[1])
                )

                if (
                    0 <= point[0] < bound_row and
                    0 <= point[1] < bound_column
                ):
                    antinodes.add(point)
                    multiplier += 1
                else:
                    out_of_bounds = True

            vector = (
                coord_list[j][0] - coord_list[i][0],
                coord_list[j][1] - coord_list[i][1]
            )

            out_of_bounds = False
            multiplier = 1
            while not out_of_bounds:
                point = (
                    coord_list[j][0] + (multiplier * vector[0]),
                    coord_list[j][1] + (multiplier * vector[1])
                )

                if (
                    0 <= point[0] < bound_row and
                    0 <= point[1] < bound_column
                ):
                    antinodes.add(point)
                    multiplier += 1
                else:
                    out_of_bounds = True

print(len(antinodes))