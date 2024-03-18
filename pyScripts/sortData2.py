import csv

# Define the file paths
input_file = 'data_v2.csv'
output_file = 'data_v3.csv'

# Function to update the specified column
def update_column(input_file, output_file, column_index, value_to_replace, replacement_value):
    with open(input_file, 'r', newline='') as infile, open(output_file, 'w', newline='') as outfile:
        reader = csv.reader(infile)
        writer = csv.writer(outfile)

        for row in reader:
            if row:  # Check if the row is not empty
                if row[column_index] == value_to_replace:
                    row[column_index] = replacement_value
                writer.writerow(row)

# Call the function to update the specified column
update_column(input_file, output_file, 5, 's', True)