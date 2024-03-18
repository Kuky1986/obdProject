import csv

# Define the file paths
input_file = 'data_v3.csv'
output_file = 'data_v4.csv'

# Function to update the specified column
def update_column(input_file, output_file):
    with open(input_file, 'r', newline='') as infile, open(output_file, 'w', newline='') as outfile:
        reader = csv.reader(infile)
        writer = csv.writer(outfile)

        for row in reader:
            if row:  # Check if the row is not empty
                updated_row = []
                for column in row:
                    if '%' in column:
                        # Remove percentage symbol and replace comma with dot
                        column = column.replace('%', '').replace(',', '.')
                    updated_row.append(column)
                writer.writerow(updated_row)

# Call the function to update the specified columns
update_column(input_file, output_file)
