'''Implement this as a function with symptom input from website'''
# If you need to open a file instead
# Get data from website from doctor answers
#Input into arrays
f1 = ['asd1','asd2','asd3','qwe']  #Dummy values
f2 = ['asd1','asd2','asd3','qwe']  #Dummy value 2
f3 = ['asd1'] 
match = 0       #Match string count
count = len(f1) #Total count
for i in range(len(f1)):
    if( f1[i] in f2):
        match+=1
prob = match/count 

print(match)
#return prob