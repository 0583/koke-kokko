// @ts-ignore
const protobuf = require("protobufjs");

protobuf.parse(`syntax = "proto3";

package csdi;
import 'record_metadata_options.proto';

message User {
    string email = 1 [ (webaas.db.record.field).primary_key = true ];
    string username = 2;
    string password = 3;
    string profile_photo = 4;
    repeated string follow_tag_arr = 5;  // get following tag by follow_tag
    repeated string published_article_arr = 6;  // get published article by article_id
    repeated string bookmark_article_arr = 7;  // get bookmarded article by article_id
}

message Article {
    string article_id =1 [ (webaas.db.record.field).primary_key = true ];   // uuid
    string email = 2;
    string author = 3;
    string user_photo = 4;
    string location = 5;
    repeated string article_photo = 6;
    string content = 7;
    string post_time = 8;
    repeated string related_tag_arr = 9;    // get related tag by related_tag
}

message Tag {
    string tagname = 1 [ (webaas.db.record.field).primary_key = true ];
    repeated string article_arr = 2;    // foreign key
}`)