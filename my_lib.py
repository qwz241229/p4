import csv,sys     

import pandas as pd  

def my_print(header, rows, n = 10, paD = 1):
    #import PrettyTable Obj
    from prettytable import PrettyTable
    #Initialise table obj
    table = PrettyTable()
    # Set the column headers
    table.field_names = header 
    # Add rows to the table
    for row in rows[:n]:
        table.add_row(row)

    table.padding_width = paD

    #Print the table
    print(table)

def my_data_load(fname, format = 1):
    my_data = []
    if format == 1:
        file = open(fname)
        csvreader = csv.reader(file)
        for row in csvreader:
            my_data.append(row)
        myheader = my_data[0]
    elif format == 2:
       df = pd.read_csv(fname)
       myheader = df.columns.tolist()
       myheader = myheader[0:18]
       my_data = df.values.tolist()
       for i in range(len(my_data)):
           my_data[i]=my_data[i][0:17]
    #print(myData, myheader, 'line20')
    return my_data,myheader

