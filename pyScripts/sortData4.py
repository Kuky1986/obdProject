import csv

# Define the file paths
input_file = 'data_v4.csv'
output_file = 'data_v5.csv'

# Function to update the specified column
def update_column(input_file, output_file):
    with open(input_file, 'r', newline='') as infile, open(output_file, 'w', newline='') as outfile:
        reader = csv.reader(infile)
        writer = csv.writer(outfile)

        for row in reader:
            if row:  # Check if the row is not empty
                for i, column in enumerate(row):
                    if i == 14:  # Check if it's the 14th column (0-based index)
                        # Replace comma with dot in the MAF column
                        column = column.replace(',', '.')
                    row[i] = column
                writer.writerow(row)

# Call the function to update the specified column
update_column(input_file, output_file)