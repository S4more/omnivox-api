import APIRequest from "./index";
import {NexusGenObjects, NexusGenArgTypes} from "../../../graphql-api/nexus-typegen"

const LeaClassQuery = `
query($lookUpType: LeaClassLookupType!, $search: String!) {
LeaClass(lookUpType: $lookUpType, search: $search)}`
const leaClassRequest = new APIRequest <
  NexusGenArgTypes["Query"]["LeaClass"],
  NexusGenObjects["LeaClass"]
  >(LeaClassQuery, "POST");
export default leaClassRequest;

