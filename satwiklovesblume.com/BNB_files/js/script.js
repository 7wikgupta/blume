/*
Copyright Ethos Digital
*/
wwf.currentSection = 0;

wwf.isAnimated = false;

wwf.footerIsUp = false;

wwf.totalSections = function() {
  return wwf.sections.length;
};

/*
# -- SECTIONS -- #
*/

wwf.sections = [
  {
    sectionID: 0,
    isLoaded: true,
    go: function() {
      var self;
      self = this;
      self.isStartPulse = true;
      self.pulseStart = function() {
        if (self.isStartPulse) {
          return $('#next').animate({
            backgroundColor: "#00b0ff"/*0F728E*/
          }, 1000, function() {
            return $(this).animate({
              backgroundColor: "#6fd1fd" /*77CEE9*/
            }, 1000, function() {
              return self.pulseStart();
            });
          });
        }
      };
      self.pulseStart();
      $('#next').click(function() {
        if (self.pulseStart) {
          self.pulseStart = false;
          return $('#next').animate({
            backgroundColor: "#6fd1fd"
          }, 1000);
        }
      });
      return true;
    },
    reset: function() {
      return true;
    }
  }, {
    sectionID: 1,
    isLoaded: false,
    images: [''],/*Needs one image*/
    go: function() {
      var self;
      self = this;
      self.isSliderPulse = true;
      self.sunPaper = Raphael('canvas-1-sun', 850, 100); /*changed from 450*/
      self.animalsPaper = Raphael('canvas-1-animals', 850, 100);
      self.sun = self.sunPaper.image('img/s1-sun.png', 150, 130, 547, 547);
      self.sun.attr({
        opacity: 0
      });
      self.sunAnimate = function() {
        return self.sun.animate({
          transform: '...r4'
        }, 1000, function() {
          return self.sunAnimate();
        });
      };
      self.sunAnimate();
      self.a1Visible = false;
      self.a2Visible = false;
      self.a3Visible = false;
      self.animal1 = self.animalsPaper.image('img/s1-animal1.png', 110, 335, 175, 55).attr({
        opacity: 0
      });
      self.animal2 = self.animalsPaper.image('img/s1-animal2.png', 290, 230, 192, 155).attr({
        opacity: 0
      });
      self.animal3 = self.animalsPaper.image('img/s1-animal3.png', 520, 280, 106, 108).attr({
        opacity: 0
      });
      self.sliderPosition = 0;
      $('#slider-1').slider({
        value: 0
      });
      $('#slider-1 .ui-slider-handle').html('<div class="handle-highlight"></div>');
      $('#slider-1 .ui-slider-handle .handle-highlight').css({
        opacity: 0
      });
      self.sliderPulse = function() {
        if (self.isSliderPulse) {
          return $('#slider-1 .ui-slider-handle .handle-highlight').animate({
            opacity: 1
          }, 1000, function() {
            return $(this).animate({
              opacity: 0
            }, 1000, function() {
              return self.sliderPulse();
            });
          });
        }
      };
      self.sliderPulse();
      $('#slider-1').bind('slide', function(event, ui) {
        var direction;
        if (self.isSliderPulse) self.isSliderPulse = false;
        direction = wwf.direction(self.sliderPosition, ui.value);
        self.sun.attr({
          opacity: ui.value / 100
        });
        switch (Math.floor(ui.value / 30)) {
          case 0:
            if (direction === 'back' && self.a1Visible) {
              self.animal1.animate({
                transform: '...s0.2,0.2,198,390'
              }, 200, 'backIn', function() {
                return this.attr({
                  opacity: 0
                });
              });
              self.a1Visible = false;
            }
            break;
          case 1:
            if (direction === 'forward' && !self.a1Visible) {
              self.animal1.attr({
                transform: 's0.2,0.2,198,390',
                opacity: 1
              }).animate({
                transform: 's1'
              }, 1000, 'elastic');
              self.a1Visible = true;
            } else if (direction === 'back' && self.a2Visible) {
              self.animal2.animate({
                transform: '...s0.2,0.2,406,385'
              }, 200, 'backIn', function() {
                return this.attr({
                  opacity: 0
                });
              });
              self.a2Visible = false;
            }
            break;
          case 2:
            if (direction === 'forward' && !self.a2Visible) {
              self.animal2.attr({
                transform: 's0.2,0.2,406,385',
                opacity: 1
              }).animate({
                transform: 's1'
              }, 1000, 'elastic');
              self.a2Visible = true;
            } else if (direction === 'back' && self.a3Visible) {
              self.animal3.animate({
                transform: '...s0.2,0.2,573,388'
              }, 200, 'backIn', function() {
                return this.attr({
                  opacity: 0
                });
              });
              self.a3Visible = false;
            }
            break;
          case 3:
            if (direction === 'forward' && !self.a3Visible) {
              self.animal3.attr({
                transform: 's0.2,0.2,573,388',
                opacity: 1
              }).animate({
                transform: 's1'
              }, 1000, 'elastic');
              self.a3Visible = true;
            }
        }
        return self.sliderPosition = ui.value;
      });
      return this.isLoaded = true;
    },
    reset: function() {
      var self;
      self = this;
      self.sliderPosition = 0;
      self.animal1.attr({
        opacity: 0
      });
      self.animal2.attr({
        opacity: 0
      });
      self.animal3.attr({
        opacity: 0
      });
      self.a1Visible = false;
      self.a2Visible = false;
      self.a3Visible = false;
      self.sun.attr({
        opacity: 0
      });
      return $('#slider-1').slider({
        value: 0
      });
    }
  }, {
    sectionID: 2,
    isLoaded: false,
    images: ['img/s2-farm.png', 'img/s2-background.png', 'img/s2-forest.png'],
    go: function() {
      var bgWidth, self;
      self = this;
      self.animalsPaper = Raphael('canvas-2-animals', 850, 100);
      self.a1Visible = true;
      self.a2Visible = true;
      self.a3Visible = true;
      self.animal1 = self.animalsPaper.image().attr({
        opacity: 1
      });
      self.animal2 = self.animalsPaper.image().attr({
        opacity: 1
      });
      self.animal3 = self.animalsPaper.image().attr({
        opacity: 1
      });
      bgWidth = 850;
      self.sliderPosition = 0;
      $('#slider-2').slider({
        value: 0
      });
      $('#slider-2').bind('slide', function(event, ui) {
        var direction, farmWidth, forestWidth;
        direction = wwf.direction(self.sliderPosition, ui.value);
        farmWidth = (bgWidth / 100) * ui.value;
        forestWidth = 850 - (farmWidth - 1);
        $('.section-2 .forest').css({
          width: forestWidth
        });
        $('.section-2 .farm').css({
          width: farmWidth
        });
        if (ui.value > 25 && direction === 'forward' && self.a1Visible) {
          self.a1Visible = false;
          self.animal1.animate({
            transform: '...s0.2,0.2,342,380'
          }, 200, 'backIn', function() {
            return this.attr({
              opacity: 0
            });
          });
        }
        if (ui.value < 25 && direction === 'back' && !self.a1Visible) {
          self.animal1.attr({
            transform: 's0.2,0.2,342,380',
            opacity: 1
          }).animate({
            transform: 's1'
          }, 1000, 'elastic');
          self.a1Visible = true;
        }
        if (ui.value > 50 && direction === 'forward' && self.a2Visible) {
          self.a2Visible = false;
          self.animal2.animate({
            transform: '...s0.2,0.2,523,361'
          }, 200, 'backIn', function() {
            return this.attr({
              opacity: 0
            });
          });
        }
        if (ui.value < 50 && direction === 'back' && !self.a2Visible) {
          self.animal2.attr({
            transform: 's0.2,0.2,523,361',
            opacity: 1
          }).animate({
            transform: 's1'
          }, 1000, 'elastic');
          self.a2Visible = true;
        }
        if (ui.value > 85 && direction === 'forward' && self.a3Visible) {
          self.a3Visible = false;
          self.animal3.animate({
            transform: '...s0.2,0.2,812,350'
          }, 200, 'backIn', function() {
            return this.attr({
              opacity: 0
            });
          });
        }
        if (ui.value < 85 && direction === 'back' && !self.a3Visible) {
          self.animal3.attr({
            transform: 's0.2,0.2,812,350',
            opacity: 1
          }).animate({
            transform: 's1'
          }, 1000, 'elastic');
          self.a3Visible = true;
        }
        return self.sliderPosition = ui.value;
      });
      return this.isLoaded = true;
    },
    reset: function() {
      var self;
      self = this;
      self.sliderPosition = 0;
      $('#slider-2').slider({
        value: 0
      });
      self.animal1.attr({
        opacity: 1,
        transform: 'S1'
      });
      self.animal2.attr({
        opacity: 1,
        transform: 'S1'
      });
      self.animal3.attr({
        opacity: 1,
        transform: 'S1'
      });
      self.a1Visible = true;
      self.a2Visible = true;
      self.a3Visible = true;
      $('.section-2 .forest').css({
        width: 850
      });
      return $('.section-2 .farm').css({
        width: 0
      });
    }
  }, {
    sectionID: 3,
    isLoaded: false,
    images: ['img/s3-co2.png', 'img/s3-earth.png'],
    go: function() {
      var self;
      self = this;
      self.foodPaper = Raphael('canvas-3-food', 850, 100); /*450*/
      self.food1 = self.foodPaper.image();
      self.food2 = self.foodPaper.image();
      self.food3 = self.foodPaper.image();
      self.food4 = self.foodPaper.image();
      self.sliderPosition = 0;
      $('#slider-3').slider({
        value: 0
      });
      $('#slider-3').bind('slide', function(event, ui) {
        var co2Top, direction, earthTop, o;
        direction = wwf.direction(self.sliderPosition, ui.value);
        earthTop = 340 - (1.3 * ui.value);
        $('.section-3 .earth').css({
          top: earthTop
        });
        co2Top = 240 - 2.9 * ui.value;
        $('.section-3 .co2').css({
          top: co2Top
        });
        if (direction === 'forward') {
          if (ui.value <= 25) {
            o = 1 - (1 / 25) * ui.value;
            self.food1.attr({
              opacity: o
            });
          }
          if (ui.value > 25) {
            self.food1.attr({
              opacity: 0
            });
          }
          if (ui.value >= 25 && ui.value <= 50) {
            o = 1 - (1 / 25) * (ui.value - 25);
            self.food2.attr({
              opacity: o
            });
          }
          if (ui.value > 50) {
            self.food2.attr({
              opacity: 0
            });
          }
          if (ui.value >= 50 && ui.value <= 75) {
            o = 1 - (1 / 25) * (ui.value - 50);
            self.food3.attr({
              opacity: o
            });
          }
          if (ui.value > 75) {
            self.food3.attr({
              opacity: 0
            });
          }
          if (ui.value >= 75) {
            o = 1 - (1 / 25) * (ui.value - 75);
            self.food4.attr({
              opacity: o
            });
          }
          if (ui.value === 100) {
            self.food4.attr({
              opacity: 0
            });
          }
        }
        if (direction === 'back') {
          if (ui.value <= 25) {
            o = 1 - (1 / 25) * ui.value;
            self.food1.attr({
              opacity: o
            });
          }
          if (ui.value === 0) {
            self.food1.attr({
              opacity: 1
            });
          }
          if (ui.value >= 25 && ui.value <= 50) {
            o = 1 - (1 / 25) * (ui.value - 25);
            self.food2.attr({
              opacity: o
            });
          }
          if (ui.value < 25) {
            self.food2.attr({
              opacity: 1
            });
          }
          if (ui.value >= 50 && ui.value <= 75) {
            o = 1 - (1 / 25) * (ui.value - 50);
            self.food3.attr({
              opacity: o
            });
          }
          if (ui.value < 50) {
            self.food3.attr({
              opacity: 1
            });
          }
          if (ui.value >= 75) {
            o = 1 - (1 / 25) * (ui.value - 75);
            self.food4.attr({
              opacity: o
            });
          }
          if (ui.value < 75) {
            self.food4.attr({
              opacity: 1
            });
          }
        }
        return self.sliderPosition = ui.value;
      });
      return this.isLoaded = true;
    },
    reset: function() {
      var self;
      self = this;
      self.sliderPosition = 0;
      $('#slider-3').slider({
        value: 0
      });
      self.food1.attr({
        opacity: 1
      });
      self.food2.attr({
        opacity: 1
      });
      self.food3.attr({
        opacity: 1
      });
      self.food4.attr({
        opacity: 1
      });
      $('.section-3 .earth').css({
        top: 340
      });
      return $('.section-3 .co2').css({
        top: 240
      });
    }
  }, {
    sectionID: 4,
    isLoaded: false,
    images: ['img/s4-person1.png', 'img/s4-person2.png', 'img/food4/apple.png', 'img/food4/bread.png', 'img/food4/can1.png', 'img/food4/can2.png', 'img/food4/can3.png', 'img/food4/can4.png', 'img/food4/can5.png', 'img/food4/can6.png', 'img/food4/jar_blue.png', 'img/food4/jar_yellow.png', 'img/food4/orange.png', 'img/food4/pizza.png', 'img/food4/sausage.png'],
    go: function() {
      var self;
      self = this;
      self.scales = Raphael('canvas-4-scales', 850, 100);
      self.foodArray = [];
      self.foodArray[0] = self.scales.image('img/food4/can4.png', 211, 258, 23, 32).attr({
        opacity: 0
      });
      self.foodArray[1] = self.scales.image('img/food4/can3.png', 232, 258, 23, 32).attr({
        opacity: 0
      });
      self.foodArray[7] = self.scales.image('img/food4/bread.png', 264, 235, 29, 33).attr({
        opacity: 0
      });
      self.foodArray[2] = self.scales.image('img/food4/can2.png', 254, 258, 23, 32).attr({
        opacity: 0
      });
      self.foodArray[3] = self.scales.image('img/food4/can1.png', 276, 263, 41, 28).attr({
        opacity: 0
      });
      self.foodArray[9] = self.scales.image('img/food4/pizza.png', 240, 200, 48, 41).attr({
        opacity: 0
      });
      self.foodArray[4] = self.scales.image('img/food4/can5.png', 211, 226, 23, 32).attr({
        opacity: 0
      });
      self.foodArray[5] = self.scales.image('img/food4/can6.png', 232, 226, 23, 32).attr({
        opacity: 0
      });
      self.foodArray[8] = self.scales.image('img/food4/jar_blue.png', 292, 222, 25, 44).attr({
        opacity: 0
      });
      self.foodArray[6] = self.scales.image('img/food4/sausage.png', 232, 226, 45, 44).attr({
        opacity: 0
      });
      self.foodArray[10] = self.scales.image('img/food4/jar_yellow.png', 211, 196, 23, 32).attr({
        opacity: 0
      });
      self.scrapArray = [];
      self.scrapArray[0] = self.scales.image('img/food4/orange.png', 532, 258, 25, 33).attr({
        opacity: 0
      });
      self.scrapArray[1] = self.scales.image('img/food4/apple.png', 558, 263, 27, 28).attr({
        opacity: 0
      });
      self.scrapArray[2] = self.scales.image('img/food4/tomato.png', 585, 272, 20, 20).attr({
        opacity: 0
      });
      self.balance = self.scales.image();
      self.fulcrum = self.scales.image();
      self.scalesRotation = 0;
      self.scalesx = 425;
      self.scalesy = 298;
      self.lastNum = -1;
      self.removeNum = -1;
      self.sliderPosition = 0;
      $('#slider-4').bind('slide', function(event, ui) {
        var direction, f, i, ii, num, r, s, scrapNum, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _len6, _len7, _len8, _m, _n, _o, _p, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
        direction = wwf.direction(self.sliderPosition, ui.value);
        num = self.foodArray.length - 1;
        i = Math.floor((num / 100) * ui.value);
        r = Math.ceil((num / 100) * ui.value);
        scrapNum = Math.floor(i / 4);
        if (direction === 'forward' && i !== self.lastNum) {
          self.removeNum = i;
          ii = 0;
          _ref = self.foodArray;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            f = _ref[_i];
            if (ii < i && self.foodArray[ii].attr('opacity') === 0) {
              self.foodArray[ii].attr('opacity', 1);
              self.scalesRotation = self.scalesRotation - 1.5;
            }
            ii = ii + 1;
          }
          if (self.foodArray[i].attr('opacity') === 0) {
            self.scalesRotation = self.scalesRotation - 1.5;
            self.foodArray[i].attr({
              opacity: 1
            });
          }
          if (i % 4 === 0 || i === 10) {
            s = 0;
            _ref2 = self.scrapArray;
            for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
              f = _ref2[_j];
              if (s < scrapNum && self.scrapArray[s].attr('opacity') === 0) {
                self.scrapArray[s].attr('opacity', 1);
              }
              s = s + 1;
            }
            if (self.scrapArray[scrapNum].attr('opacity') === 0) {
              self.scrapArray[scrapNum].attr({
                opacity: 1
              });
            }
          }
          _ref3 = self.foodArray;
          for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
            f = _ref3[_k];
            f.stop().animate({
              transform: 'R' + self.scalesRotation + ',' + self.scalesx + ',' + self.scalesy
            }, 800, 'bounce');
          }
          _ref4 = self.scrapArray;
          for (_l = 0, _len4 = _ref4.length; _l < _len4; _l++) {
            f = _ref4[_l];
            f.stop().animate({
              transform: 'R' + self.scalesRotation + ',' + self.scalesx + ',' + self.scalesy
            }, 800, 'bounce');
          }
          self.balance.stop().animate({
            transform: 'R' + self.scalesRotation + ',' + self.scalesx + ',' + self.scalesy
          }, 800, 'bounce');
        }
        if (direction === 'back' && self.lastNum === self.removeNum || (i === 0 && direction === 'back')) {
          if (self.lastNum === 10) {
            self.removeNum = i;
          } else {
            self.removeNum = i - 1;
          }
          if (i === 0) self.removeNum = 0;
          r = self.removeNum;
          ii = 0;
          _ref5 = self.foodArray;
          for (_m = 0, _len5 = _ref5.length; _m < _len5; _m++) {
            f = _ref5[_m];
            if (ii > r && self.foodArray[ii].attr('opacity') === 1) {
              self.foodArray[ii].attr('opacity', 0);
              self.scalesRotation = self.scalesRotation + 1.5;
            }
            ii = ii + 1;
          }
          if (self.foodArray[r].attr('opacity') === 1) {
            self.scalesRotation = self.scalesRotation + 1.5;
            self.foodArray[r].attr({
              opacity: 0
            });
          }
          if (i % 4 === 0 || r === 0) {
            s = 0;
            _ref6 = self.scrapArray;
            for (_n = 0, _len6 = _ref6.length; _n < _len6; _n++) {
              f = _ref6[_n];
              if (s > scrapNum && self.scrapArray[s].attr('opacity') === 1) {
                self.scrapArray[s].attr('opacity', 0);
              }
              s = s + 1;
            }
            if (self.scrapArray[scrapNum].attr('opacity') === 1) {
              self.scrapArray[scrapNum].attr({
                opacity: 0
              });
            }
          }
          if (ui.value === 0) self.scalesRotation = 0;
          _ref7 = self.foodArray;
          for (_o = 0, _len7 = _ref7.length; _o < _len7; _o++) {
            f = _ref7[_o];
            f.stop().animate({
              transform: 'R' + self.scalesRotation + ',' + self.scalesx + ',' + self.scalesy
            }, 800, 'bounce');
          }
          _ref8 = self.scrapArray;
          for (_p = 0, _len8 = _ref8.length; _p < _len8; _p++) {
            f = _ref8[_p];
            f.stop().animate({
              transform: 'R' + self.scalesRotation + ',' + self.scalesx + ',' + self.scalesy
            }, 800, 'bounce');
          }
          self.balance.stop().animate({
            transform: 'R' + self.scalesRotation + ',' + self.scalesx + ',' + self.scalesy
          }, 800, 'bounce');
        }
        if (ui.value === 0) {
          self.lastNum = -1;
        } else {
          self.lastNum = i;
        }
        return self.sliderPosition = ui.value;
      });
      return this.isLoaded = true;
    },
    reset: function() {
      var f, self, _i, _j, _len, _len2, _ref, _ref2;
      self = this;
      self.scalesRotation = 0;
      self.lastNum = -1;
      self.removeNum = -1;
      self.sliderPosition = 0;
      $('#slider-4').slider({
        value: 0
      });
      _ref = self.foodArray;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        f = _ref[_i];
        f.stop().attr({
          opacity: 0,
          transform: 'R' + self.scalesRotation + ',' + self.scalesx + ',' + self.scalesy
        });
      }
      _ref2 = self.scrapArray;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        f = _ref2[_j];
        f.stop().attr({
          opacity: 0,
          transform: 'R' + self.scalesRotation + ',' + self.scalesx + ',' + self.scalesy
        });
      }
      return self.balance.stop().attr({
        transform: 'R' + self.scalesRotation + ',' + self.scalesx + ',' + self.scalesy
      });
    }
  }, {
    sectionID: 5,
    isLoaded: false,
    images: ['img/s5-bin.png', 'img/s5-people.png', 'img/food5/apple.png', 'img/food5/carrot.png', 'img/food5/chicken.png', 'img/food5/jam.png', 'img/food5/lemon.png', 'img/food5/lime.png', 'img/food5/meat.png', 'img/food5/pizza2.png'],
    go: function() {
      var foodArray, newFood, self;
      self = this;
      self.foodCanvas = Raphael('canvas-5-food', 104, 270);
      foodArray = [
        {
          url: 'img/food5/apple.png',
          w: 39,
          h: 42
        }, {
          url: 'img/food5/carrot.png',
          w: 23,
          h: 88
        }, {
          url: 'img/food5/chicken.png',
          w: 43,
          h: 76
        }, {
          url: 'img/food5/jam.png',
          w: 37,
          h: 40
        }, {
          url: 'img/food5/lemon.png',
          w: 31,
          h: 52
        }, {
          url: 'img/food5/lime.png',
          w: 33,
          h: 64
        }, {
          url: 'img/food5/meat.png',
          w: 51,
          h: 68
        }, {
          url: 'img/food5/pizza2.png',
          w: 55,
          h: 44
        }, {
          url: 'img/food5/sausage.png',
          w: 59,
          h: 58
        }
      ];
      self.binFull = self.foodCanvas.image();
      newFood = function() {
        var h, i, u, w, x, y;
        i = Math.floor(Math.random() * foodArray.length);
        u = foodArray[i].url;
        w = foodArray[i].w;
        h = foodArray[i].h;
        x = 5 + Math.floor(40 * Math.random());
        y = 10 + Math.floor(10 * Math.random());
        return self.foodCanvas.image(u, x, y, w, h).attr({
          transform: 'S0.2'
        }).animate({
          transform: 'S1'
        }, 200, 'backOut', function() {
          return this.animate({
            y: 200
          }, 500, 'bounce', function() {
            return this.remove();
          });
        });
      };
      self.sliderPosition = 0;
      $('#slider-5').bind('slide', function(event, ui) {
        var direction, y;
        direction = wwf.direction(self.sliderPosition, ui.value);
        if (direction === 'forward') if (ui.value % 2 === 0) newFood();
        y = 196 - ui.value;
        self.binFull.attr({
          y: y
        }).toFront();
        $('.section-5 .money').css({
          'margin-top': 80 - (70 / 100) * ui.value
        });
        $('.section-5 .money .value').text(Math.ceil((680 / 100) * ui.value));
        return self.sliderPosition = ui.value;
      });
      return this.isLoaded = true;
    },
    reset: function() {
      var self;
      self = this;
      $('#slider-5').slider({
        value: 0
      });
      self.binFull.attr({
        y: 196
      });
      $('.section-5 .money').css({
        'margin-top': 80
      });
      return $('.section-5 .money .value').text(0);
    }
  }, {
    sectionID: 6,
    isLoaded: false,
    images: ['img/s6-hand-left.png', 'img/s6-hand-right.png'],
    go: function() {
      var self;
      self = this;
      self.sliderPosition = 0;
      $('#slider-6').bind('slide', function(event, ui) {
        var direction;
        direction = wwf.direction(self.sliderPosition, ui.value);
        if (ui.value === 0) {
          $('.section-6 .money .value').text(10000);
        } else {
          $('.section-6 .money .value').text(wwf.addCommas(Math.ceil((16000000000 / 100) * ui.value)));
        }
        $('.section-6 .wrapper, .section-6 .money .inner').width(40 + ((338 / 100) * ui.value));
        return self.sliderPosition = ui.value;
      });
      return this.isLoaded = true;
    },
    reset: function() {
      var self;
      self = this;
      $('#slider-6').slider({
        value: 0
      });
      $('.section-6 .money .value').text(10000);
      return $('.section-6 .wrapper, .section-6 .money .inner').width(40);
    }
  }, {
    sectionID: 7,
    isLoaded: false,
    images: ['img/s7-basket.png', 'img/s7-main.png', 'img/food7/green_fruit.png', 'img/food7/orange_fruit.png', 'img/food7/red_fruit.png'],
    go: function() {
      var self;
      self = this;
      self.paper = Raphael('canvas-7-fruit', 850, 100);
      self.foodArray = [
        self.paper.image('img/food7/red_fruit.png', 41, 203, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/green_fruit.png', 60, 203, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/orange_fruit.png', 79, 203, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/yellow_fruit.png', 98, 203, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/yellow_fruit.png', 51, 188, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/red_fruit.png', 70, 188, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/green_fruit.png', 89, 188, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/orange_fruit.png', 61, 172, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/yellow_fruit.png', 81, 172, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/red_fruit.png', 71, 157, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/red_fruit.png', 196, 203, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/green_fruit.png', 215, 203, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/orange_fruit.png', 234, 203, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/yellow_fruit.png', 253, 203, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/yellow_fruit.png', 206, 188, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/red_fruit.png', 225, 188, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/green_fruit.png', 244, 188, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/orange_fruit.png', 216, 172, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/yellow_fruit.png', 236, 172, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/red_fruit.png', 226, 157, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/red_fruit.png', 304, 203, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/green_fruit.png', 323, 203, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/orange_fruit.png', 342, 203, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/yellow_fruit.png', 361, 203, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/yellow_fruit.png', 314, 188, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/red_fruit.png', 333, 188, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/green_fruit.png', 352, 188, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/orange_fruit.png', 324, 172, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/yellow_fruit.png', 344, 172, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/red_fruit.png', 334, 157, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/red_fruit.png', 466, 203, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/green_fruit.png', 485, 203, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/orange_fruit.png', 504, 203, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/yellow_fruit.png', 523, 203, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/yellow_fruit.png', 472, 188, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/red_fruit.png', 495, 188, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/green_fruit.png', 514, 188, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/orange_fruit.png', 486, 172, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/yellow_fruit.png', 506, 172, 19, 20).attr({
          opacity: 0
        }), self.paper.image('img/food7/red_fruit.png', 496, 157, 19, 20).attr({
          opacity: 0
        })
      ];
      self.paper.image('img/s7-basket.png', 35, 183, 90, 42);
      self.paper.image('img/s7-basket.png', 190, 183, 90, 42);
      self.paper.image('img/s7-basket.png', 298, 183, 90, 42);
      self.paper.image('img/s7-basket.png', 460, 183, 90, 42);
      self.sliderPosition = 0;
      $('#slider-7').bind('slide', function(event, ui) {
        var direction, f, i, val, _i, _len, _ref;
        direction = wwf.direction(self.sliderPosition, ui.value);
        val = (40 / 100) * ui.value;
        i = 0;
        _ref = self.foodArray;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          f = _ref[_i];
          if (i >= val) {
            if (f.attr('opacity') === 1) {
              f.attr({
                opacity: 0
              });
            }
          } else {
            if (f.attr('opacity') === 0) {
              f.attr({
                opacity: 1,
                transform: 'S0.2T0,-100'
              }).animate({
                transform: 'S1T0,-100'
              }, 200, 'backOut', function() {
                return this.animate({
                  transform: 'T0,0'
                }, 300, 'bounce');
              });
            }
          }
          i = i + 1;
        }
        return self.sliderPosition = ui.value;
      });
      return this.isLoaded = true;
    },
    reset: function() {
      var f, self, _i, _len, _ref, _results;
      self = this;
      $('#slider-7').slider({
        value: 0
      });
      _ref = self.foodArray;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        f = _ref[_i];
        _results.push(f.attr({
          opacity: 0
        }));
      }
      return _results;
    }
  }
];

/*
# -- APP FUNCTIONS -- #
*/

wwf.loadSection = function() {
  var section;
  section = wwf.sections[wwf.currentSection];
  $(wwf.getSection(wwf.currentSection)).show();
  return section.go();
};

wwf.loader = function(id) {
  var i, images, _i, _len;
  $('#preloader').text('0%').stop(true, false).fadeIn();
  wwf.pxloader = new PxLoader();
  images = wwf.sections[id].images;
  wwf.pxloader.addProgressListener(function(e) {
    var done, total;
    done = e.completedCount;
    total = e.totalCount;
    return $('#preloader').text(Math.round((100 / total) * done) + '%');
  });
  wwf.pxloader.addCompletionListener(function() {
    wwf.sections[id].go();
    $('#preloader').stop(true, false).fadeOut();
    return $(wwf.getSection(id)).animate({
      left: 0
    }, 1500, 'easeOutQuint', function() {
      return wwf.isAnimated = false;
    });
  });
  for (_i = 0, _len = images.length; _i < _len; _i++) {
    i = images[_i];
    wwf.pxloader.addImage(i);
  }
  return wwf.pxloader.start();
};



wwf.next = function() {
  var nextSection, pw, s, slideInNext, total;
  total = wwf.totalSections();
  if (!wwf.isAnimated) {
    wwf.isAnimated = true;
    if (wwf.currentSection < (total - 1)) {
      nextSection = wwf.currentSection + 1;
      pw = $(window).width();
      slideInNext = function() {
        var s;
        s = wwf.getSection(nextSection);
        $(s).css({
          left: pw
        }).show();
        wwf.currentSection = nextSection;
        if (!wwf.sections[wwf.currentSection].isLoaded) {
          return wwf.loader(wwf.currentSection);
        } else {
          wwf.sections[wwf.currentSection].reset();
          return $(s).animate({
            left: 0
          }, 1500, 'easeOutQuint', function() {
            return wwf.isAnimated = false;
          });
        }
      };
      s = wwf.getSection(wwf.currentSection);
      return $(s).animate({
        left: 0 - pw
      }, 1000, 'easeInQuint', function() {
        $(this).hide();
        if (wwf.currentSection === 0) {
          $('#next .inner').text('Next');
          $('#prev').css({
            display: 'block'
          });
          $('#horizon').stop().fadeIn();
        }
        return slideInNext();
      });
    } else {
      wwf.isAnimated = false;
      return wwf.goFooter();
    }
  }
};

wwf.prev = function() {
  var previousSection, pw, s, slideInPrev, total;
  total = wwf.totalSections();
  if (!wwf.isAnimated) {
    wwf.isAnimated = true;
    if (wwf.currentSection > 0) {
      previousSection = wwf.currentSection - 1;
      pw = $(window).width();
      slideInPrev = function() {
        var s;
        s = wwf.getSection(previousSection);
        $(s).css({
          left: 0 - pw
        }).show();
        wwf.currentSection = previousSection;
        if (!wwf.sections[wwf.currentSection].isLoaded) {
          wwf.loader(wwf.currentSection);
        } else {
          wwf.sections[wwf.currentSection].reset();
        }
        return $(s).animate({
          left: 0
        }, 1500, 'easeOutQuint', function() {
          return wwf.isAnimated = false;
        });
      };
      s = wwf.getSection(wwf.currentSection);
      return $(s).animate({
        left: pw
      }, 1000, 'easeInQuint', function() {
        $(this).hide();
        if (wwf.currentSection === 1) {
          $('#next .inner').text('Start');
          $('#prev').css({
            display: 'none'
          });
          $('#horizon').stop().fadeOut();
        }
        return slideInPrev();
      });
    } else {
      wwf.isAnimated = false;
      return console.log('we have reached the start!');
    }
  }
};

wwf.goFooter = function() {
  wwf.footerIsUp = true;
  $('footer').animate({
    'padding-top': 0
  }, 100);
  return $('footer .lets-change').fadeOut(function() {
    var wh;
    wh = $(window).height() - 90;
    $('footer .page').fadeIn().animate({
      height: wh
    }, 1500, 'easeOutQuint');
    $('footer .page .inner').fadeIn();
    $('footer').addClass('active');
    return $('.logo-white').fadeIn(function() {
      return $('.logo-color').fadeOut();
    });
  });
};

wwf.closeFooter = function() {
  $('footer .page').fadeIn().animate({
    height: 10
  }, 1500, 'easeOutQuint', function() {
    return wwf.footerIsUp = false;
  });
  $('footer .page .inner').fadeOut(function() {
    return $('footer .lets-change').fadeIn();
  });
  $('footer').removeClass('active');
  return $('.logo-color').fadeIn(function() {
    return $('.logo-white').fadeOut();
  });
};

wwf.resize = function() {
  if (wwf.footerIsUp) return $('footer .page').height($(window).height() - 90);
};

wwf.countdown = function() {
  var goTimer, remainder, self;
  self = this;
  self.target = new Date(2012, 2, 31, 20, 30);
  self.now = new Date();
  if (self.now <= self.target) {
    remainder = self.target - self.now;
    goTimer = function() {
      var days, hours, minutes, seconds;
      self.difference = remainder;
      days = Math.floor(self.difference / 1000 / 60 / 60 / 24);
      self.difference -= days * 1000 * 60 * 60 * 24;
      hours = Math.floor(self.difference / 1000 / 60 / 60);
      self.difference -= hours * 1000 * 60 * 60;
      minutes = Math.floor(self.difference / 1000 / 60);
      self.difference -= minutes * 1000 * 60;
      seconds = Math.floor(self.difference / 1000);
      $('footer .timer .days .value').text(wwf.addZero(days));
      $('footer .timer .hours .value').text(wwf.addZero(hours));
      $('footer .timer .mins .value').text(wwf.addZero(minutes));
      $('footer .timer .secs .value').text(wwf.addZero(seconds));
      remainder -= 1000;
      return setTimeout(goTimer, 1000);
    };
    return goTimer();
  }
};

wwf.template = function() {
  $(".slider").slider();
  $('#next').mouseover(function() {
    return $(this).stop().animate({
      width: 98
    }, 100);
  });
  $('#next').mouseout(function() {
    return $(this).stop().animate({
      width: 88
    }, 100);
  });
  $('#prev').mouseover(function() {
    return $(this).stop().animate({
      width: 98
    }, 100);
  });
  $('#prev').mouseout(function() {
    return $(this).stop().animate({
      width: 88
    }, 100);
  });
  $('footer').mouseenter(function() {
    if (!wwf.footerIsUp) {
      return $(this).stop().animate({
        'padding-top': 10
      }, 100);
    }
  });
  $('footer').mouseleave(function() {
    if (!wwf.footerIsUp) {
      return $(this).stop().animate({
        'padding-top': 0
      }, 100);
    }
  });
  $('footer').click(function() {
    if (!wwf.footerIsUp) return wwf.goFooter();
  });
  $('#close').click(function() {
    if (wwf.footerIsUp) return wwf.closeFooter();
  });
  $('footer .tweet-now').click(function() {
    var oh, ow, sl, st, x, y;
    st = window.screenY;
    sl = window.screenX;
    oh = window.outerHeight;
    ow = window.outerWidth;
    x = sl + ((ow / 2) - 250);
    y = st + ((oh / 2) - 200);
    return window.open('http://twitter.com/home?status=Go%20beyond%20the%20%23earthhour%20%26%20ask%20%40DefraGovUK%20to%20lead%20%26%20tackle%20food%20sustainability%20%26%20global%20hunger.%20http%3A%2F%2Fbit.ly%2FFoodStory%20Pls%20RT', '_blank', 'left=' + x + ',top=' + y + 'location=no, menubar=no, status=no, directories=no, width=500, height=400, scrollbars=yes, resizable=no');
  });
  $('footer .facebook').click(function() {
    var oh, ow, sl, st, x, y;
    st = window.screenY;
    sl = window.screenX;
    oh = window.outerHeight;
    ow = window.outerWidth;
    x = sl + ((ow / 2) - 250);
    y = st + ((oh / 2) - 200);
    return window.open('http://www.facebook.com/sharer/sharer.php?u=http://wwf.org.uk/foodstory/', '_blank', 'left=' + x + ',top=' + y + 'location=no, menubar=no, status=no, directories=no, width=500, height=400, scrollbars=yes, resizable=no');
  });
  return $('footer .google').click(function() {
    var oh, ow, sl, st, x, y;
    st = window.screenY;
    sl = window.screenX;
    oh = window.outerHeight;
    ow = window.outerWidth;
    x = sl + ((ow / 2) - 250);
    y = st + ((oh / 2) - 200);
    return window.open('https://plusone.google.com/_/+1/confirm?hl=en&url=http://wwf.org.uk/foodstory/', '_blank', 'left=' + x + ',top=' + y + 'location=no, menubar=no, status=no, directories=no, width=500, height=400, scrollbars=yes, resizable=no');
  });
};

wwf.resetSection = function(self) {
  return $(self).hide();
};

wwf.init = function() {
  wwf.template();
  wwf.countdown();
  return wwf.loadSection();
};

/*
# -- UTILITY FUNCTIONS -- #
*/

wwf.getPageWidth = function() {
  return $(window).width();
};

wwf.direction = function(before, after) {
  if (after - before > 0) {
    return 'forward';
  } else {
    return 'back';
  }
};

wwf.getSection = function(id) {
  return $('.section[data-section=' + id + ']');
};

wwf.addCommas = function(nStr) {
  var rgx, x, x1;
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';;
  rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		};
  return x1 + x2;
};

wwf.addZero = function(n) {
  if (n < 10) {
    return '0' + n;
  } else {
    return n;
  }
};

$(document).keydown(function(e) {
    switch(e.which) {
        case 37:
        return wwf.prev(); // left
        break;

        case 38: // up
        break;

        case 39:
        return wwf.next(); // right
        break;

        case 40: // down
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

$(function() {
  wwf.init();
  $('#next').click(function() {
    return wwf.next();
  });
  $('#prev').click(function() {
    return wwf.prev();
  });
  return $(window).resize(function() {
    return wwf.resize();
  });
});
