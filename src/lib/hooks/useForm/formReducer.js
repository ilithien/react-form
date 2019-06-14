import { FormActions } from "./formActions";

export default function formReducer(state, { type, payload }) {
  switch (type) {
    case FormActions.VALUE_CHANGED: {
      return {
        ...state,
        values: {
          ...state.values,
          [payload.name]: payload.value
        }
      };
    }
    case FormActions.FIELD_CORRECT: {
      const newErrorsWithoutThisField = { ...state.errors };
      delete newErrorsWithoutThisField[payload.name];
      return {
        ...state,
        errors: {
          ...newErrorsWithoutThisField
        }
      };
    }
    case FormActions.FIELD_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [payload.name]: payload.value
        }
      };
    case FormActions.FORM_INVALID:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...payload
        }
      };
    default:
      return state;
  }
}
