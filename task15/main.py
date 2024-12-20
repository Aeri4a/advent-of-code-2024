import sys
from copy import deepcopy

if len(sys.argv) < 2:
    print('File not passed')
    exit(-1)


board = []
moves = []
curr_pos = []
with open(sys.argv[1]) as file:
    B, M = file.read().split('\n\n')

    for idx, b in enumerate(B.split('\n')):
        find_start = b.find('@')
        if find_start != -1: curr_pos = [idx, find_start]
        board.append(list(b))
    
    for m in M:
        if m != '\n':
            moves.append(m)

cdir = {
    '^': [-1, 0],
    'v': [1, 0],
    '>': [0, 1],
    '<': [0, -1]
}

board2 = deepcopy(board)

# PART ONE
# Function which is moving packages if they are on way
def traverse(x, y, sign, direct):
    add_x, add_y = cdir[direct]
    next_sign = board[x+add_x][y+add_y]

    if next_sign == '#':
        return False
    
    if next_sign == '.':
        board[x+add_x][y+add_y] = sign
        return True

    if next_sign == 'O':
        result = traverse(x+add_x, y+add_y, next_sign, direct)
        if result:
            board[x+add_x][y+add_y] = sign
            return True


for move in moves:
    if traverse(curr_pos[0], curr_pos[1], '@', move):
        board[curr_pos[0]][curr_pos[1]] = '.'
        add_x, add_y = cdir[move]
        curr_pos[0] = curr_pos[0]+add_x
        curr_pos[1] = curr_pos[1]+add_y


result = 0
for rid, row in enumerate(board):
    for cid, column in enumerate(row):
        if column == 'O':
            result += 100*rid + cid

print(result)

# PART TWO
board = []
curr_pos = []
for rid, row in enumerate(board2):
    board.append([])
    for cid, column in enumerate(row):
        if column == '#':
            board[-1].append('#')
            board[-1].append('#')
        elif column == '.':
            board[-1].append('.')
            board[-1].append('.')
        elif column == '@':
            curr_pos.append(rid)
            curr_pos.append(len(board[-1]))
            board[-1].append('@')
            board[-1].append('.')
        else:
            board[-1].append('[')
            board[-1].append(']')


def traverse2(x, y, direct, new_pos):
    add_x, add_y = cdir[direct]
    next_sign = board[x+add_x][y+add_y]

    new_pos[0].add((x+add_x, y+add_y))
    new_pos[1].append((board[x][y], (x+add_x, y+add_y), (x, y)))

    if next_sign == '#':
        return False
    
    if next_sign == '.':
        return True
    
    if direct == '<' or direct == '>':
        result = traverse2(x+add_x, y+add_y, direct, new_pos)
        return result
    else:
        if next_sign == '[':
            right = traverse2(x+add_x, y+1, direct, new_pos)
            left = traverse2(x+add_x, y, direct, new_pos)
            if right and left:
                return True
        elif next_sign == ']':
            right = traverse2(x+add_x, y, direct, new_pos)
            left = traverse2(x+add_x, y-1, direct, new_pos)
            if right and left:
                return True


for move in moves:
    move_result = [set(), []]
    if traverse2(curr_pos[0], curr_pos[1], move, move_result):
        board[curr_pos[0]][curr_pos[1]] = '.'
        add_x, add_y = cdir[move]

        curr_pos[0] = curr_pos[0]+add_x
        curr_pos[1] = curr_pos[1]+add_y

        for sign, (new_x, new_y), (old_x, old_y) in move_result[1]:
            board[new_x][new_y] = sign
            if (old_x, old_y) not in move_result[0]:
                board[old_x][old_y] = '.'


result = 0
for rid, row in enumerate(board):
    for cid, column in enumerate(row):
        if column == '[':
            result += 100*rid + cid

print(result)