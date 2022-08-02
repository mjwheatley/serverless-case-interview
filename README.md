# Serverless Case Interview
<p>
The goal of this exercise is to test your knowledge and understanding of key components of a serverless
system. You will need to stand up a few AWS Services.
</p>
<p>
The case application you need to create is an inventory system for a small business that has 3
warehouses: NorthEast, SouthEast, SouthWest. The business owners need a way to upload two csvs new
items and assign a quantity to a given location. The owners need to know what items each location has,
the number of items, and the monetary value of a given item for a single location or all locations.
</p>

Your prototype should fulfill three main components:

* S3 bucket
* DynamoDB table
* Lambda/Step Function for uploading CSVs to DynamoDB
* Lambda/Step Function for each of the following DynamoDB pulls/calculations, returning the
result of the calculation in the response.
  * Total value of a product at a warehouse
  * List of warehouses for a product and their quantity at the warehouse
  
For example, Ketchup can be an item that costs $5.00 per unit. The NorthEast location has 2 units totaling $10.00 and the SouthEast location has 4 units totaling $20.00. The total value of Ketchup is 6 bottles and $30.

Constraints:
* The data must be persistent
* Use Node for lambda functions
* Deployment must be via infrastructure as code (Cloudformation/SAM)

The solution must be demonstrated during the interview. You will not be assessed on the design of the presentation layer, only on the functionality. Your choice of libraries and technologies is completely up to you as long as you fulfill the constraints. 

During the case you will be asked to deploy the stack, load the csvs, then execute each of the lambdas.
* Back End: AWS Serverless | S3, Lambda, Cognito, DynamoDB, EventBridge, Step Functions
