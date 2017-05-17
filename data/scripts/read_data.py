import os
import pandas as pd
import sys
import json

# Iterating over sub_dataframes of dataframe 'df'.
# Sub dataframes are all records for each value in column_name.
def sub_dataframe_from_all_column_values(column_name, df):
    unique_column_values = df[column_name].drop_duplicates()
    for value in unique_column_values:
        yield df[df[column_name] == value]

# From all sub dataframes that are created with 'sub_dataframe_from_all_column_values(column_name, df)',
# Create a list filled dictionary whose keys are in 'columns_for_dict' and values in sub dataframe.
# 'columns_for_dict' must be a dictionary of the form { <name for dict> : <sub dataframe column name> }
def create_list_of_dicts_from_sub_dataframe(column_name, df, columns_for_dict):
    lst = []
    for sub_df in sub_dataframe_from_all_column_values(column_name, df):
        dct = create_dict_from_dataframe(sub_df, columns_for_dict)
        lst.append(dct)
    return lst

# Create a dictionary from 'colummns_for_dict' from dataframe df
# 'columns_for_dict' must be a dictionary of the form { <name for dict> : <dataframe column name> }
def create_dict_from_dataframe(df, columns_for_dict):
    dct = {}
    for dict_name, col_name in columns_for_dict.items():
        if type(df[col_name].iloc[0]) != str:
            print(type(df[col_name].iloc[0]))
            dct[dict_name] = float(df[col_name].iloc[0])
        else:
            dct[dict_name] = df[col_name].iloc[0]
    return dct

# Return department in specific json format
def get_department(name, current_year = 2017):

    # Get core data needed for this function
    file_path = os.path.abspath(os.path.join(os.getcwd(), 'data/flattended_data_for_ap.csv'))
    df = pd.read_csv(file_path, encoding = 'utf-8')
    df = df[df['department_name'] == name]

    # Create department dictionary and base level values
    tmp = df[df['year'] == current_year]
    columns_for_dict = {'name':'department_name', 'current_budget':'Sum of Dept Total output cost', 'prev_budget':'prev_year Sum of Dept Total output cost'}
    dept = create_dict_from_dataframe(tmp, columns_for_dict)

    # Iterate over all programs
    programs = []
    for program in sub_dataframe_from_all_column_values('program_name', df):

        # Create program dictionary and base level values
        columns_for_dict = {'name':'program_name', 'description':'program_description'}
        prog = create_dict_from_dataframe(program, columns_for_dict)

        # Iterate over all years
        columns_for_dict = {'year':'year', 'budget':'Total output cost'}
        prog['budgets'] = create_list_of_dicts_from_sub_dataframe('year', program, columns_for_dict)

        # Iterate over all deliverables
        deliverables = []
        for deliverable in sub_dataframe_from_all_column_values('deliverable', program):

            # Create deliverable dictionary and base level values
            columns_for_dict = {'name':'deliverable', 'metric_units':'measure_unit', 'metric_type':'measure_type'}
            deliv = create_dict_from_dataframe(program, columns_for_dict)

            # Iterate over all years
            columns_for_dict = {'year':'year', 'metric':'estimate_or_actual'}
            deliv['metrics'] = create_list_of_dicts_from_sub_dataframe('year', program, columns_for_dict)

            deliverables.append(deliv)

        prog['deliverables'] = deliverables
        programs.append(prog)

    dept['programs'] = programs
    return json.dumps(dept)

print(json.dumps(get_department(sys.argv[1])))
