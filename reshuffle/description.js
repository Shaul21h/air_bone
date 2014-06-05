var request = require('request');
var parseString = require('xml2js').parseString;

module.exports.getFullDescription = function(wordToGet,callback,options) {
    // app.get('/descriptionJson', function(req, res) {

        /* options :{
            imageLimit : integer,
            phrases: boolean,
            anagrams:boolean,
            synonyms: boolean
        }
        */

        /*Variables declaration starts */
        var wordDetails = {};
        var imageList = [];
        var phrasesList = {};
        var anagramsString = "";

        var Phrase = "";
        var Anagrams = "";
        var Images = [];
        var Speech = "",
            Definition = "",
        Usage = "",
        Audio = "",
        Synonyms = "",
        Antonyms = "";
        /*Variables ends */

        

        var decrypt=function(word){
            var temp=word.split('|');
            var ranNo=temp[1];
            var data=temp[0].split('a');
            temp="";
            for(var i=1;i<data.length;i++){
                temp=temp+(String.fromCharCode(data[i]-ranNo));
            }
            return temp;
        }
        var inputWord = wordToGet;
        if(typeof options !== "undefined" && typeof options.encrypted !== "undefined"){
            if(options.encrypted==true)
                inputWord = decrypt(wordToGet);
        }
        /*function definitions */
        var getWordDetails = function(keyWord) {
            url = 'http://api.pearson.com/v2/dictionaries/entries?headword=' + keyWord + '&apikey=6pUM7idZK2khzpx31xSfUoUapA2wQbzm';
            request(url, function(err, response, data) {
                console.log(err);
                if (!err && response.statusCode == 200) {
                    wordDetails = JSON.parse(data);
                    console.log(wordDetails);

                    if (Object.keys(wordDetails).length > 0) {
                        for (var item = 0; item < wordDetails.results.length; item++) {
                            if (wordDetails.results[item].headword == keyWord) {
                                Definition = wordDetails.results[item].senses[0].definition;
                                if (wordDetails.results[item].senses[0].examples) {
                                    Usage = wordDetails.results[item].senses[0].examples[0].text;
                                    if (wordDetails.results[item].senses[0].examples[0].audio)
                                        Audio = "http://api.pearson.com" + wordDetails.results[item].senses[0].examples[0].audio[0].url;
                                }
                                break;
                            }
                        }
                    }
                }
                getDKImages(keyWord);
            });
        }
        var getDKImages = function(keyWord) {
            var limit=3;
            if(typeof options !== "undefined"){
                limit = options.imageLimit;
            }
            url = 'http://api.pearson.com/dk/v1/images?caption=' + keyWord + '&limit='+limit+'&apikey=6pUM7idZK2khzpx31xSfUoUapA2wQbzm';
            request(url, function(err, response, data) {

                if (!err && response.statusCode == 200) {
                    imageList = JSON.parse(data);

                    if (imageList.images && imageList.images.length > 0) {
                        imageList.images.forEach(function(imageItem) {
                            Images.push(imageItem.url);
                        })
                        
                    }
                    else
                        getGoogleImages(keyWord);
                }
                getPhrases(keyWord);
            });
        }
        var getGoogleImages = function(keyWord) {
            url = 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + keyWord;
            request(url, function(err, response, data) {
                if (!err && response.statusCode == 200) {
                    imageList = JSON.parse(data);
                    if (imageList.responseData && imageList.responseData.results) {
                        imageList.responseData.results.forEach(function(result) {
                            Images.push(result.url);
                        });
                        
                    }
                }
            });
        };
        var getPhrases = function(keyWord) {
            url = 'http://stands4.com/services/v2/phrases.php?uid=2167&tokenid=LL870U6UWvQIh9w&phrase=' + keyWord;
            if(typeof options !== "undefined" && typeof options.phrases !== "undefined"){
                if(options.phrases==false)
                    url="";
            }
            //url = 'http://stands4.com/services/v2/phrases.php?uid=2167&tokenid=LL870U6UWvQIh9w&phrase=' + keyWord;
            request(url, function(err, response, data) {
                if (!err && response.statusCode == 200) {
                    parseString(data, function(error, result) {
                        phraseObj = result;
                        if (!error && phraseObj.results.result) {
                            Phrase = phraseObj.results.result[0].explanation;
                        } else if (error) {
                            console.log('parse error in getPhrases: ' + error.message);
                        }

                    });
                }
                getAnagrams(keyWord);
            });
        };
        var getAnagrams = function(keyWord) {
            url = 'http://anagramica.com/best/:' + keyWord;
            if(typeof options !== "undefined" && typeof options.anagrams !== "undefined"){
                if(options.anagrams==false)
                    url="";
            }
            request(url, function(err, response, anagramdata) {
                if (!err && response.statusCode == 200) {
                    var jsonData = JSON.parse(anagramdata);
                    console.log(jsonData);
                    Anagrams = jsonData['best'].join(",");
                }
                getSynonyms(keyWord);
            });
        };
        var getSynonyms = function(keyWord) {
            url = 'http://stands4.com/services/v2/syno.php?uid=2167&tokenid=LL870U6UWvQIh9w&word=' + keyWord;
            if(typeof options !== "undefined" && typeof options.synonyms !== "undefined"){
                if(options.synonyms==false)
                    url="";
            }
            request(url, function(err, response, data) {
                if (!err && response.statusCode == 200) {
                    parseString(data, function(error, parsedJson) {
                        if (!error && parsedJson.results.result) {
                            Synonyms = parsedJson.results.result[0].synonyms;
                            Antonyms = parsedJson.results.result[0].antonyms;
                            Speech = parsedJson.results.result[0].partofspeech;
                            if (Definition == "" || Definition == null)
                                Definition = parsedJson.results.result[0].definition;
                        }

                    });
                }
                callback({//res.send({
                    EncryptWord:wordToGet,
                    KeyWord: keyWord,
                    Speech: Speech,
                    Audio: Audio,
                    Definition: Definition,
                    Usage: Usage,
                    Phrase: Phrase,
                    Synonyms: Synonyms,
                    Antonyms: Antonyms,
                    Anagrams: Anagrams,
                    Images: Images
                });//});
            });
        }

        getWordDetails(inputWord);
    // });
};