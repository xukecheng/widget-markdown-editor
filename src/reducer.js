export const reducer = (state, action) => {
  switch (action.type) {
    case "setContent":
      console.log("setContent")
      state['content'] = action.content
      return state
    case "setRecord":
      state.recordId = action.recordId
      state.fieldId = action.fieldId
      return state
    case "setHeading":
      console.log("setHeading")
      return { ...state, headingList: action.headingList }
    default:
      return state
  }
}

export const initialState = {
  recordId: null,
  fieldId: null,
  content: null,
  headingList: null,
}