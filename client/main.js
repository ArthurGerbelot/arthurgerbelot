import { Template } from 'meteor/templating'

import './main.html'
import './main.less'

let BLAs = [
  'Coffee Drinker',
  'Meteor Lover',
  'Web Developer',
  'React User',
  'OverWatch Player',
  'Poutine Eater',
  '( ͡° ͜ʖ ͡°) Super Troller',
  'Snowboarder',
]

ALLOW_JS_UPDATE = true
let INCREMENT_ANGLE = 2
let INCREMENT_PERCENT_COLOR = 0.5

let COLORS = [
  {label: 'green', hexa: '#54C140', rgb:{ r: 84, g: 193, b: 64}},
  {label: 'yellow', hexa: '#F1C40F', rgb:{ r: 241, g: 196, b: 15}},
  {label: 'red', hexa: '#AE2727', rgb:{ r: 174, g: 80, b: 32}},
]

Modernizr.addTest('backgroundcliptext', function(){
  var div = document.createElement('div');
  div.style.cssText = Modernizr._prefixes.join('background-clip:text;');
  return !!div.style.cssText.replace(/\s/g,'').length;
});

function getColor(percent, start, end) {
  let diff = Math.abs(start - end)
  if (start < end) {
    return parseInt(start + (percent / 100) * diff)
  } else {
    return parseInt(start - (percent / 100) * diff)
  }
}


Template.layout.onCreated(function() {
  let instance = this
  let count_bla = BLAs.length

  instance.followLabel = new ReactiveVar(null)
  instance.blabla = new ReactiveVar("Web Developer")
  instance.isBlablaHidden = new ReactiveVar(true)
  // instance.containerIsOpen = new ReactiveVar(false)
  // instance.isBlablaClose = new ReactiveVar(true)

  let bgAngle = 100
  let bgColorStart = COLORS[0].rgb
  let bgColorEnd = COLORS[1].rgb
  let bgPercent = 0

  // Cube interval
  let cubeInterval = function() {
    // I'ts not loaded, recall now
    if (!$('.cube').length) {
      return Meteor.setTimeout(cubeInterval, 100);
    }

    let interval_time = parseFloat((Math.random() * 3) + 3).toFixed(1) // 3.0 -> 5.9 ms
    let cubeAngles = [Math.random() * 360, Math.random() * 360, Math.random() * 360]
    $('.cube').css({
      transition: 'all ' + interval_time + 's',
      transform: "rotateX(" + cubeAngles[0] + "deg) rotateY(" + cubeAngles[1] + "deg) rotateZ(" + cubeAngles[2] + "deg)"
    })

    Meteor.setTimeout(cubeInterval, interval_time * 1000);
  }

  // First time, call... now !
  // cubeInterval()

/*
  // BG interval
  Meteor.setInterval(function() {
    // Review angle
    bgAngle = (bgAngle > 360) ? 0 : bgAngle + INCREMENT_ANGLE
    bgPercent = (bgPercent > 200) ? 0 : bgPercent + INCREMENT_PERCENT_COLOR
    // 0 -> 100 -> 200
    // 0 -> 100 -> 0
    let percent = (bgPercent < 100) ? bgPercent : 100 - (bgPercent - 100)

    bgColorStart = {
      r: getColor(percent, COLORS[0].rgb.r, COLORS[1].rgb.r),
      g: getColor(percent, COLORS[0].rgb.g, COLORS[1].rgb.g),
      b: getColor(percent, COLORS[0].rgb.b, COLORS[1].rgb.b),
    }
    bgColorEnd = {
      r: getColor(percent, COLORS[1].rgb.r, COLORS[2].rgb.r),
      g: getColor(percent, COLORS[1].rgb.g, COLORS[2].rgb.g),
      b: getColor(percent, COLORS[1].rgb.b, COLORS[2].rgb.b),
    }

    if (ALLOW_JS_UPDATE) {
      $('.body-after').css({
        'background-image': "-webkit-linear-gradient(" + bgAngle + "deg, rgb(" + bgColorStart.r + ", " + bgColorStart.g + ", " + bgColorStart.b + "), rgb(" + bgColorEnd.r + ", " + bgColorEnd.g + ", " + bgColorEnd.b + "))"
      })
    }
  }, 100)

  */

  // BLABLA interval
  Meteor.setTimeout(function () {
    instance.isBlablaHidden.set(false)
  }, 100)

  Meteor.setInterval(function() {
    Meteor.setTimeout(function() {
      instance.isBlablaHidden.set(true)
    }, 4500)

    Meteor.setTimeout(function() {
      let idx = Math.floor(Math.random() * count_bla)
      if (BLAs[idx] === instance.blabla.get()) {
        idx++
        if (idx >= count_bla) {
          idx = 0
        }
      }
      instance.blabla.set(BLAs[idx])
      instance.isBlablaHidden.set(false)
    }, 4950)


  }, 5000)
})

Template.layout.helpers({
  // containerIsOpen() {
  //   return Template.instance().containerIsOpen.get()
  // },
  getFollowLinks() {
    return [
      {
        label: 'GitHub',
        icon: 'github',
        url: 'https://github.com/ArthurGerbelot',
      },
      {
        label: 'Linkedin',
        icon: 'linkedin',
        url: 'https://ca.linkedin.com/in/arthurgerbelot',
      },
      {
        label: 'Stack Overflow',
        icon: 'stack-overflow',
        url: 'http://stackoverflow.com/users/2929632/arthur',
      },
      {
        label: 'Codepen',
        icon: 'codepen',
        url: 'http://codepen.io/ArthyFiciel/',
      },
    ]
  },
  followLabel() {
    return Template.instance().followLabel.get()
  },
  blabla() {
    return Template.instance().blabla.get()
  },
  isBlablaHidden() {
    return Template.instance().isBlablaHidden.get()
  },
  year() {
    return new Date().getFullYear()
  }
})

Template.layout.events({
  'mouseenter .follow a': function (e) {
    Template.instance().followLabel.set(e.currentTarget.getAttribute('data-label'))
  },
  'mouseleave .follow a': function (e) {
    Template.instance().followLabel.set(null)
  },
  'click h1 span, click .cube': function (e) {
    // $('html').toggleClass('open')
    // Template.instance().containerIsOpen.set(false)
  },
})
