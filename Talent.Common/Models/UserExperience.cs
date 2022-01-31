using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Talent.Common.Models
{
    [BsonIgnoreExtraElements]
    public class UserExperience
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Company { get; set; }
        public string Position { get; set; }
        public string Responsibilities { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
