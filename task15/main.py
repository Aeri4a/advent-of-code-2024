import sys

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
