import pandas as pd
import os
import re
import numpy as np


# RegEx for filtering out extraneous data labels and notes
character_regex = re.compile('[\s,<>]')
irrelevant_regex = re.compile('^performance\smeasures$|new performance measure|expected\soutcome|201[567]-1[678]\starget|sources?:|note:', re.IGNORECASE)
description_regex = re.compile('^this\sperformance\smeasure|^(?:[tT]his|[tT]he)\sobjective|^(?:[tT]his|[tT]he)\soutput', re.IGNORECASE)
cat_regex = re.compile('^Source:')
metric_type_regex = re.compile('^(Quantity|Quality|Timeliness|Cost)$')
text_regex = re.compile('\w+')


def is_irrelevant_text(i, df):
    label = df.iloc[i, 0]

    if (type(label) == str and
        (bool(irrelevant_regex.search(label)) or
         bool(description_regex.search(label)) and not is_description(i, df))):
        return True

    return False


def is_deliverable_label(i, df):
    label = df.iloc[i, 1]

    if type(label) == str and bool(text_regex.search(label)):
        return True

    return False


def is_category_label(i, df):
    for n in range(3, 5):
        if i - 1 >= 0 and type(df.iloc[i - 1, 0]) == str and df.iloc[i - 1, 0] != 'Performance measures':
            return False

        if i + n < len(df):
            label = df.iloc[i + n, 0]

            # If there's an empty cell, between a potential category label and 'Quantity' cell,
            # it's probably not actually a label
            if type(label) != str:
                return False
            # 'Quantity' generally appears at the top of a new table
            if label == 'Quantity' or label == 'Quality':
                if is_category_label(i + 1, df):
                    return False

                source_check = df.iloc[i - 3, 0] if i - 3 >= 0 else ''

                # Extra check in case a category/program doesn't have description
                if n == 3 and type(source_check) == str and bool(cat_regex.search(source_check)):
                    return True
                if n == 4:
                    return True

    return False


def is_program_label(i, df):
    if i + 2 < len(df):
        label = df.iloc[i + 2, 0]

        # If there's an empty cell, between a potential program label and 'Quantity' cell,
        # it's probably not actually a label
        if label == np.nan:
            return False

        # 'Quantity' generally appears at the top of a new table
        if label == 'Quantity' or label == 'Quality':
            return True

    return False


def is_description(i, df):
    if i - 1 >= 0 and (is_category_label(i - 1, df) or is_program_label(i - 1, df)):
        if bool(is_metric_type(i, df)):
            return False

        return True

    return False


def is_metric_type(i, df):
    label = df.iloc[i, 0]

    if type(label) == str and bool(metric_type_regex.search(label)):
        return True

    return False


def add_text_label(i, df):
    if type(df.iloc[i, 0]) == str:
        if i == 0:
            return 'department'
        if is_irrelevant_text(i, df):
            return 'irrelevant'
        if is_deliverable_label(i, df):
            return 'deliverable'
        if is_category_label(i, df):
            return 'category'
        if is_program_label(i, df):
            return 'program'
        if is_description(i, df):
            return 'description'
        if is_metric_type(i, df):
            return 'metric_type'
        return 'unknown'
    return np.nan


def add_text_labels(df):
    new_df = df.copy()
    new_df['label'] = [add_text_label(i, df) for i, _ in enumerate(df['text'])]

    return new_df


def organize_rows(df):
    # Moving around some of the top rows to get useful column labels
    col_list = df.iloc[2]
    col_list[0] = 'text'

    new_df = df.drop(2)
    new_df.columns = col_list

    return new_df


def converter(cell_value):
    if type(cell_value) == str:
        # 'nm' is the VIC government's NaN
        if cell_value == 'nm':
            return np.nan

        # Some numbers are presented as ranges with '-'. We just average the range to get a useable value.
        if '-' in cell_value:
            numbers = cell_value.split('-')

            try:
                return np.mean(float(numbers[0]), float(numbers[1]))
            except (ValueError, TypeError):
                return cell_value

        # Remove spaces and symbols
        if bool(re.search(character_regex, cell_value)):
            number = re.sub(character_regex, '', cell_value)

            try:
                return float(number)
            except ValueError:
                return cell_value

    return cell_value


# Clean up the numbers with converter function
def clean_numbers(df):
    return df.applymap(lambda x: converter(x))


def load_file(filename='Department-of-Economic-Development-Jobs-Transport-and-Resources-Output-Performance-Measures-2017-18.xlsx'):
    # Load the raw Excel file
    file_path = os.path.abspath(os.path.join(os.getcwd(), '../raw_data/budgets/', file_name))
    df = pd.read_excel(file_path, header=None, thousands=' ')

    return df


def main():
    df = load_file()
    df2 = clean_numbers(df)
    df3 = organize_rows(df2)
    df4 = add_text_labels(df3)

    return df4


main()
