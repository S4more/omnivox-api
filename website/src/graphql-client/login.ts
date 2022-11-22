import APIRequest from "./index";
import {NexusGenObjects, NexusGenArgTypes} from "../../../graphql-api/nexus-typegen"

const loginQuery = 
`mutation Login($id:String!, $password:String!) 
{login (id: $id, password: $password) {token}}`;
const loginRequest = new APIRequest <NexusGenArgTypes["Mutation"]["login"], NexusGenObjects["AuthPayload"]>(loginQuery, "POST");
export default loginRequest;
