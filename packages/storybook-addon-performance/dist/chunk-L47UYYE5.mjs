// src/tasks/get-interaction-group.ts
var interactionGroupId = "Interactions";
function getInteractionGroup(interactions) {
  const tasks = interactions.map(
    (item, index) => {
      return {
        ...item,
        type: "interaction",
        name: item.name,
        description: item.description || "(None provided)"
      };
    }
  );
  return {
    groupId: interactionGroupId,
    name: "Interactions \u{1F579}",
    tasks
  };
}

export {
  interactionGroupId,
  getInteractionGroup
};
