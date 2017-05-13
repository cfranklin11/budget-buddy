import sys
import os
import pandas as pd

def clean_data(department):
    file_path = os.path.abspath(os.path.join(os.getcwd(), 'data/cleaned_data.csv'))
    data = pd.read_csv(file_path)
    dept_data = data[data['department_name'].str.lower() == department.lower()]
    dept_data.loc[:, 'measure_target'] = pd.to_numeric(dept_data['measure_target'], errors='coerce').fillna(0)
    dept_data.loc[:, 'estimate_or_actual'] = pd.to_numeric(dept_data['estimate_or_actual'], errors='coerce').fillna(0)

    df = dept_data[['program_name', 'year', 'deliverable', 'estimate_or_actual']].copy()
    toc = df[df['deliverable'] == 'Total Output Cost'].rename(columns = {'estimate_or_actual':'total_output_cost'})[['program_name', 'year', 'total_output_cost']]

    # total_output_cost added as separate column (linked on year and program_name)
    df = dept_data.copy()
    new_df = df.merge(toc)
    new_df = df[df['deliverable'] != 'Total Output Cost']

    return df

def main(department):
    return clean_data(department).to_dict('records')

print(main(sys.argv[1]))
