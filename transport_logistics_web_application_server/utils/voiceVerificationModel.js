const tf = require('@tensorflow/tfjs-node');

let model;

async function loadModel() {
    model = await tf.loadLayersModel('file://model.json'); //TODO
}

async function verifySpeaker(filePath1, filePath2) {
    const audioBuffer1 = fs.readFileSync(filePath1);
    const audioBuffer2 = fs.readFileSync(filePath2);

    const audioTensor1 = tf.node.decodeWav(audioBuffer1).audio;
    const audioTensor2 = tf.node.decodeWav(audioBuffer2).audio;

    const prediction = model.predict([audioTensor1, audioTensor2]);
    return prediction.dataSync()[0];
}

module.exports = { loadModel, verifySpeaker };
