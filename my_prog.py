from my_lib import *

myrows, myheaders = my_data_load('anl.YANG.86400', format = int(sys.argv[1]))

myheaders = myheaders[1:18]
myrows = myrows[1:]
my_print(myheaders, myrows, n=50, paD = 1)
