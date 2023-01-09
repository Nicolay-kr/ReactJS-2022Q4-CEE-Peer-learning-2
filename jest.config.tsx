module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
  testPath.replace('__tests__', '__snapshots__') + snapshotExtension,
};
