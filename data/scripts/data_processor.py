import sys
import os
import pandas as pd

def list_depts():
    data = get_data();
    depts = pd.unique(data['department_name'])

    return depts

def clean_data(department):
    data = get_data()
    dept_data = data[data['department_name'].str.lower() == department.lower()]
    dept_data.loc[:, 'measure_target'] = pd.to_numeric(dept_data['measure_target'], errors='coerce').fillna(0)
    dept_data.loc[:, 'estimate_or_actual'] = pd.to_numeric(dept_data['estimate_or_actual'], errors='coerce').fillna(0)

    df = dept_data[['program_name', 'year', 'deliverable', 'estimate_or_actual']].copy()
    toc = df[df['deliverable'] == 'Total Output Cost'].rename(columns = {'estimate_or_actual':'total_output_cost'})[['program_name', 'year', 'total_output_cost']]

    df = dept_data.copy()
    new_df = df.merge(toc)
    cleaned_new_df = df[df['deliverable'] != 'Total Output Cost']

    return cleaned_new_df

def get_data():
    file_path = os.path.abspath(os.path.join(os.getcwd(), 'data/cleaned_data.csv'))
    data = pd.read_csv(file_path)

    return data

def main(args):
    if len(args) > 1 and type(args[1]) == str:
        return clean_data(args[1]).to_dict('records')
    else:
        return list_depts()

print(main(sys.argv))
