'use strict';

const rn = require('random-number'); 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  // function welcome(agent) {
  //   agent.add(`Welcome to my agent!`);
  // }
 
//   function fallback(agent) {
//     agent.add(`I didn't understand`);
//     agent.add(`I'm sorry, can you try again`);
    
// }

  // below to get this function to be run when a Dialogflow intent is matched
  function tellfacts(agent) {
   var month = agent.parameters.months;
   var index = rn({min:  0,max:  11,integer: true});
   var randomText = [`If born on ${month}, you simply reject failure. You are passionate about your freedom. Your positive attitude, combined with your ambitions, results in enviable success. You are tenacious, passionate, quick-witted, resourceful, rebellious, ambitious, materialistic, and guarded.`,
    `People with a birthday on ${month} are straightforward and rebellious. The restless individual born on this month can also be reckless. But be careful! The consequences of such recklessness could change your life! Diligent, creative, energetic, ruthless, brash, destructive and tactless - is what people born on this month are like.`,
     `Those born on ${month} like being fit and thus maintain healthy lifestyles. Those born this month are likely to be understated artists whose creativity may be stifled. You are spontaneous, intellectual, exceptional, resilient, impatient, moody, pessimistic and irritable.`,
      `Your personality is tender and joyful. Typically, you avoid negativity. Despite your best efforts, you may end up being an idealistic and perhaps, commitment-phobic person. Sensitive, helpful, innocent, organized, humble, cagey, innovative, hasty, and lethargic, the personality of one born on ${month} is someone who is tender and joyful.`,
      `You are a mystical creature that uses your intuition for guidance. Your birthmonth helps you make a good love connection and even better business deals. You are communicative, rational, optimistic, unstable, detached, isolated, and impetuous.`,
      `Those born on ${month} have strong influences and possess secure ties with family. Your birthmonth suggests that dramatic changes in your life could damage your reputation. Hardworking, honest, inexpressive, sensitive, extravagant, full of self-doubt, distrustful, and unforgiving, describe those born on the ${month}`,
      `Those born on ${month} are impulsive, impatient and gifted. You are self-assured, sacrificing, faithful, steadfast, intolerant, complicated, shy and wasteful. You respect authority. You are a shy individual who wants a faithful partner.`,
      `Those born on ${month} are hardworking, but should not forget to have some fun. You are a workaholic who eats and sleeps business. You should relax and learn to delegate work. Truthful, industrious, discerning, idealistic, jealous, suspicious, selfish, aloof, and tensed is what you are like.`,
      `If your birthmonth is ${month}, you are remarkably humble. Accordingly, you balance your career and home, even though your capabilities are endless because you have the right alliances. You are a philosopher who is determined, humble, dedicated, negative, tensed, nervous and stressed.`,
      `Those born on ${month} have a charismatic personality. You are flirtatious and people are also drawn to your charitable ways. You have many underlying talents. You are amiable, motivated, interesting, mistrustful, deceptive, secretive and suspicious.`,
      `Those born on ${month} make awesome parents. You are likely to marry young, with a desire to live comfortably. You are fierce, intuitive, energetic, confident, unstable, hasty, controlling and irate.`,
      `The personality of someone born on ${month} is of a calm, imaginative and dependable person. You are funny, possess a magnetic attraction for money-making, are a go-getter, enthusiastic, shrewd, imaginative, laidback, secretive, difficult and dominating.`];
    var ans = randomText[index];
    agent.add(ans);
      }


  let intentMap = new Map();
  // intentMap.set('Default Welcome Intent', welcome);
  // intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('tell-facts', tellfacts);
  agent.handleRequest(intentMap);
});


