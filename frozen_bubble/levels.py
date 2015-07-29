f = open("C:\\Users\\sony\\Desktop\\Frozen_bubble\\levels.txt")

lis = [[]]

i = 0
j = 0

for line in f:
    if line != '\n':
        lis[i].append([])
        for c in line:
            try:
                if(c == '-'):
                    lis[i][j].append(-1)
                else:
                    lis[i][j].append(int(c))
            except:
                pass
        j+=1
    else:
        lis.append([])
        i+=1
        j = 0



f.close()

levels = open("C:\\Users\\sony\\Desktop\\Frozen_bubble\\levels.js","w")
levels.write("var levels = " + str(lis)+";")
levels.close()
