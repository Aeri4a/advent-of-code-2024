import re

IN_PATTERN = r"p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)"
BORDER_ROW = 103
BORDER_COL = 101
SECONDS = 100

robots = []
with open('input.txt') as file:
    lines = file.readlines()
    for line in lines:
        match = re.findall(IN_PATTERN, line)[0]
        robots.append({
            "p": [int(match[0]), int(match[1])],
            "v": [int(match[2]), int(match[3])],
        })
    
def make_iteration(seconds):
    final_pos = {}
    for robot in robots:
        x_coord = (
            robot["p"][0] + seconds * robot["v"][0]
        ) % BORDER_COL

        y_coord = (
            robot["p"][1] + seconds * robot["v"][1]
        ) % BORDER_ROW

        if (x_coord, y_coord) not in final_pos:
            final_pos[(x_coord, y_coord)] = 1
        else:
            final_pos[(x_coord, y_coord)] += 1

    return final_pos

# PART ONE
# count = [0, 0, 0, 0]
# for pos, number in final_pos.items():
#     if (
#         pos[0] < BORDER_COL//2 and
#         pos[1] < BORDER_ROW//2
#     ): count[0] += number

#     if (
#         pos[0] > BORDER_COL//2 and
#         pos[1] < BORDER_ROW//2
#     ): count[1] += number

#     if (
#         pos[0] < BORDER_COL//2 and
#         pos[1] > BORDER_ROW//2
#     ): count[2] += number

#     if (
#         pos[0] > BORDER_COL//2 and
#         pos[1] > BORDER_ROW//2
#     ): count[3] += number

# result = count[0]*count[1]*count[2]*count[3]
# print(result)

# PART TWO

# THIS IS FOR FUN SEARCHING :)
# THERE SHOULD BE A BETTER SOLUTION - LIKE SEARCH FOR BIG GROUPS OF POINTS...
seconds = 0
while True:
    seconds += 1
    final_pos = make_iteration(seconds)
    for i in range(BORDER_ROW):
        for j in range(BORDER_COL):
            if (i,j) in final_pos:
                print("\033[48;5;1m  \033[0m", end='')
            else:
                print("\033[48;5;2m  \033[0m", end='')
        print()

    print(f"\nThat was: {seconds}")
    input()
