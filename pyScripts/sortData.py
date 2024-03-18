import csv

# Input and output file paths
input_file = 'data.csv'
output_file = 'data_v1.csv'

def process_csv(input_file, output_file):
    with open(input_file, 'r', newline='') as infile, open(output_file, 'w', newline='') as outfile:
        reader = csv.DictReader(infile)
        fieldnames = reader.fieldnames

        # Write header to the output file
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()

        # Process each row
        for row in reader:
            # Convert '1,4' to '1.4' in the 'ENGINE_POWER' column
            row['ENGINE_POWER'] = row['ENGINE_POWER'].replace(',', '.')

            # Write the modified row to the output file
            writer.writerow(row)

# Process the CSV file
process_csv(input_file, output_file)