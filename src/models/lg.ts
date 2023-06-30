import mongoose from "mongoose";

// export interface lgRegionAttrs {
//   name: string;
//   created: string;
//   description: string;
// }

// An interface that describes the properties that a User Document has
export interface lgDoc extends mongoose.Document {
  name: string;
  created: string;
  history: string;
  state: string;
}

// An interface that describes the properties that a User Model has
export interface LgModel extends mongoose.Model<lgDoc> {
}

const lgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    created: {
      type: String,
      required: true,
    },
    history: {
      type: String,
      required: true,
    },
    state: {
        type: String,
        required: true,
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// lgSchema.statics.build = (attrs: lgRegionAttrs) => {
//   return new Lg(attrs);
// };

const Lg = mongoose.model<lgDoc, LgModel>("Lg", lgSchema);

export { Lg };
