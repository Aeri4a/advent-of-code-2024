import sys

sys.setrecursionlimit(100000)

if len(sys.argv) < 2:
    print('File not passed')
    exit(-1)

board = []
start_pos = []
with open(sys.argv[1]) as file:
    lines = file.readlines()
    for rid, line in enumerate(lines):
        board.append([])
        for cid, char in enumerate(line):
            if char == 'S':
                start_pos = [rid, cid]
            board[-1].append(char)


ch_dir = {
    0: [-1, 0],
    1: [0, 1],
    2: [1, 0],
    3: [0, -1]
}

BIG_NUMBER = 999999999999999999999999999999

def traverse(x, y, direct, curr_sum, visited):
    act_sign = board[x][y]

    if act_sign == '#':
        return BIG_NUMBER

    if (x, y, direct) not in visited:
        visited[x, y, direct] = curr_sum
    else:
        if visited[x, y, direct] > curr_sum:
            visited[x, y, direct] = curr_sum
        else:
            return BIG_NUMBER

    if act_sign == 'E':
        return curr_sum

    # calc cost
    # forward
    add_x, add_y = ch_dir[direct]
    a = traverse(x+add_x, y+add_y, direct, curr_sum+1, visited)
    # clockwise
    add_x, add_y = ch_dir[(direct+1)%4]
    b = traverse(x+add_x, y+add_y, (direct+1)%4, curr_sum+1+1000, visited)

    # counterclockwise
    add_x, add_y = ch_dir[(direct-1)%4]
    c = traverse(x+add_x, y+add_y, (direct-1)%4, curr_sum+1+1000, visited)

    return min(a, b, c)

visited = dict()
result = traverse(start_pos[0], start_pos[1], 1, 0, visited)

print(result)