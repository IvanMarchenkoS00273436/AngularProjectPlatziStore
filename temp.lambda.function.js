import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    ScanCommand,
    PutCommand,
    GetCommand,
    DeleteCommand,
    QueryCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "UserCarts";

export const handler = async (event, context) => {
    let body;
    let statusCode = 200;

    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
    };

    try {
        switch (event.routeKey) {
            case "GET /products_in_cart/{userId}":
                body = await dynamo.send(
                    new QueryCommand({
                        TableName: tableName,
                        KeyConditionExpression: "userId = :userId", 
                        ExpressionAttributeValues: {
                            ":userId": event.pathParameters.userId,
                        },
                    })
                );
            body = body.Items;
            break;

        case "POST /products_in_cart":
                let requestJSON = JSON.parse(event.body);
                
                if (!requestJSON.userId || !requestJSON.productId) {
                    statusCode = 400;
                    body = { message: "userId and productId are required fields" };
                    break;
                }
                
                await dynamo.send(
                    new PutCommand({
                        TableName: tableName,
                        Item: {
                            userId: requestJSON.userId,
                            productId: requestJSON.productId
                        },
                    })
                );
                
                body = {
                    message: "Product added to cart successfully",
                    item: {
                        userId: requestJSON.userId,
                        productId: requestJSON.productId
                    }
                };
            break;

                case "DELETE /products_in_cart/{userId}/{productId}":
                    await dynamo.send(
                        new DeleteCommand({
                            TableName: tableName,
                            Key: {
                                userId: event.pathParameters.userId,
                                productId: event.pathParameters.productId,
                            },
                        })
                    );
                    body = {
                        message: "Product removed from cart successfully",
                        userId: event.pathParameters.userId,
                        productId: event.pathParameters.productId
                    };
                break;
        }
    } 
    catch (err) {
        statusCode = 400;
        body = err.message;
    } 
    finally { 
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};