import csv

# Input and output file paths
input_file = 'data_v1.csv'
output_file = 'data_v2.csv'

def process_csv(input_file, output_file):
    with open(input_file, 'r', newline='') as infile, open(output_file, 'w', newline='') as outfile:
        reader = csv.DictReader(infile)
        fieldnames = reader.fieldnames

        # Write header to the output file
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()

        # Process each row
        for row in reader:
            # Convert '58,4%' to '58.4' in the 'FUEL_LEVEL' column
            row['FUEL_LEVEL'] = float(row['FUEL_LEVEL'].replace(',', '.')[:-1])

            # Convert '33,30%' to '33.30' in the 'ENGINE_LOAD' column
            row['ENGINE_LOAD'] = float(row['ENGINE_LOAD'].replace(',', '.'))

            # Write the modified row to the output file
            writer.writerow(row)

# Process the CSV file
process_csv(input_file, output_file)