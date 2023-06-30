import mongoose, { Schema } from "mongoose";

export interface stateRegionAttrs {
  name: string;
  created: string;
  region: string;
  history: string;
}

// An interface that describes the properties that a User Document has
export interface stateDoc extends mongoose.Document {
  name: string;
  created: string;
  region: string;
  history: string;
}

// An interface that describes the properties that a User Model has
export interface StateMode extends mongoose.Model<stateDoc> {
  build(attrs: stateRegionAttrs): stateDoc;
}

const stateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    created: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    history: {
      type: String,
      required: true,
    },
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

stateSchema.statics.build = (attrs: stateRegionAttrs) => {
  return new State(attrs);
};

const State = mongoose.model<stateDoc, StateMode>("State", stateSchema);

export { State };
