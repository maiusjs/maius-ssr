module.exports = ({ router, controller }) => {
  router.get('/author', controller.views.author);

  router.get(/^\/(?!api)[^.]*$/, controller.views.base);
};
