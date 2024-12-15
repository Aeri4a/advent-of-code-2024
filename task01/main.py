
left = []
right = []
with open('input.txt', 'r') as file:
    lines = file.readlines()
    for line in lines:
        line = line.split('   ')
        left.append(int(line[0]))
        right.append(int(line[1]))

# --- part one
left.sort()
right.sort()

total_distance = 0
for l, r in zip(left, right):
    total_distance += abs(l-r)

print(total_distance)

# --- part two
occur = {}
for r in right:
    if r in occur.keys():
        occur[r] += 1
    else:
        occur[r] = 1

total = 0
for l in left:
    if l in occur.keys():
        total += l * occur[l]

print(total)