global.firebase = {
  initializeApp: () => console.log('hi firebase'),
  auth: () => ({
    signInWithEmailAndPassword: () => Promise.resolve(),
    createUserWithEmailAndPassword: () => Promise.resolve(),
  }),

  // firestore: () => ({
  //   collection: () => ({
  //     doc: () => ({
  //       set: () => Promise.resolve(),
  //     }),
  //   }),
  // }),
  firestore: () => Promise.resolve(),
  collection: () => Promise.resolve(),
  doc: () => Promise.resolve(),
  set: () => Promise.resolve(),
};
