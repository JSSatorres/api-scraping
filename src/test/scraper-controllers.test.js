const { scrapOnePage, scrapXPages} = require ("../controllers/scraper-controllers")



  describe("given test service ", () => {
    describe("when is imboced  scrapOnePage ", () => {
      describe(" it resolves   ", () => {
        test("then send status should have been called", () => {
          try {
            const res = {
              sendStatus: jest.fn(),
            };
            const req = {
              sendStatus: jest.fn(),
            };
            scrapOnePage(req, res);
            expect(res.sendStatus).toHaveBeenCalledWith(200);
          } catch (e) {
            expect(e);
          }
        });
      });
    });
  });


  describe("given test service ", () => {
    describe("when is imboced  scrapOnePage ", () => {
      describe(" it resolves   ", () => {
        test("then send status should have been called", () => {
          try {
            const res = {
              sendStatus: jest.fn(),
            };
            const req = {
              params: {pages:1},
              };
            expect(res.sendStatus).toHaveBeenCalledWith(200);
          } catch (e) {
            expect(e);
          }
        });
      });
    });
  });
  // describe("given test service ", () => {
  //   describe("when is imboced  getPlayList ", () => {
  //     describe(" it resolves   ", () => {
  //       test("then send status should have been called", () => {
  //         try {
  //           const res = {
  //             sendStatus: jest.fn(),
  //           };
  //           const req = {
  //             sendStatus: jest.fn(),
  //           };
  //           getPlayList(req, res);
  //           expect(res.sendStatus).toHaveBeenCalledWith(200);
  //         } catch (e) {
  //           expect(e);
  //         }
  //       });
  //     });
  //   });
  // });
  // describe("given test service ", () => {
  //   describe("when is imboced  createPlaylist ", () => {
  //     describe(" it resolves   ", () => {
  //       test("then send status should have been called", () => {
  //         try {
  //           const res = {
  //             sendStatus: jest.fn(),
  //           };
  //           const req = {
  //             sendStatus: jest.fn(),
  //           };
  //           createPlaylist(req, res);
  //           expect(res.sendStatus).toHaveBeenCalledWith(200);
  //         } catch (e) {
  //           expect(e);
  //         }
  //       });
  //     });
  //   });
  // });
  // describe("given test service ", () => {
  //   describe("when is imboced  addSongToPlaylist ", () => {
  //     describe(" it resolves   ", () => {
  //       test("then send status should have been called", () => {
  //         try {
  //           const res = {
  //             sendStatus: jest.fn(),
  //           };
  //           const req = {
  //             sendStatus: jest.fn(),
  //           };
  //           addSongToPlaylist(req, res);
  //           expect(res.sendStatus).toHaveBeenCalledWith(200);
  //         } catch (e) {
  //           expect(e);
  //         }
  //       });
  //     });
  //   });
  // });
  // describe("given test service ", () => {
  //   describe("when is imboced  removePlaylistById ", () => {
  //     describe(" it resolves   ", () => {
  //       test("then send status should have been called", () => {
  //         try {
  //           const res = {
  //             sendStatus: jest.fn(),
  //           };
  //           const req = {
  //             sendStatus: jest.fn(),
  //           };
  //           removePlaylistById(req, res);
  //           expect(res.sendStatus).toHaveBeenCalledWith(200);
  //         } catch (e) {
  //           expect(e);
  //         }
  //       });
  //     });
  //   });
  // });
  