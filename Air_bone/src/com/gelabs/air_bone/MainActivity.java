package com.gelabs.air_bone;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Locale;
import java.util.concurrent.ExecutionException;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.DefaultClientConnection;

import android.app.Activity;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.os.Bundle;
import android.speech.RecognizerIntent;
import android.speech.tts.TextToSpeech;
import android.speech.tts.TextToSpeech.OnInitListener;
import android.view.Menu;
import android.widget.Toast;

public class MainActivity extends Activity {
	protected static final int RESULT_SPEECH = 1;
	private TextView speaknow;
	private LinearLayout chatcontainer;
	private TextView valueTV ;
	//private TextToSpeech tts;
	
	private String url = "http://10.98.5.161:4000/hello";
//	private String url = "http://api.pearson.com/v2/dictionaries/entries?headword=dog&apikey=6pUM7idZK2khzpx31xSfUoUapA2wQbzm";
	
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        final ImageButton speakbutton = (ImageButton) findViewById(R.id.speakbutton);
        speaknow = (TextView) findViewById(R.id.speaknow);
        chatcontainer = (LinearLayout)findViewById(R.id.chatcontainer);
        //tts = new TextToSpeech(this, (OnInitListener) this);
        speakbutton.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				speakbutton.setImageResource(R.drawable.lc_micglow);
				speaknow.setText("Speak now");
			
				   Intent intent = new Intent(
	                        RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
	 
	                intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, "en-US");
	 
	                try {
	                    startActivityForResult(intent, RESULT_SPEECH);
	                    //txtText.setText("");
	                } catch (ActivityNotFoundException a) {
	                    Toast t = Toast.makeText(getApplicationContext(),
	                            "Opps! Your device doesn't support Speech to Text",
	                            Toast.LENGTH_SHORT);
	                    t.show();
	                }
			}
		});
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }
    
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
 
        switch (requestCode) {
        case RESULT_SPEECH: {
            if (resultCode == RESULT_OK && null != data) {
 
                ArrayList<String> text = data
                        .getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                valueTV = new TextView(this);
                valueTV.setTextSize(24);
                valueTV.setId(5);
                                
                //HttpGet httpGet = new HttpGet(url);
                
             
                //valueTV.setText(text.get(0));
             // Making HTTP Request
                //try {
                    //HttpResponse response = httpClient.execute(httpGet);
                 
                    // writing response to log
                    //valueTV.setText(response.toString());
                    //Log.d("Http Response:", response.getEntity().toString());
                 
                //} catch (ClientProtocolException e) {
                    // writing exception to log
                  //  e.printStackTrace();
                  //       
                //} catch (IOException e) {
                    // writing exception to log
                //    e.printStackTrace();
                //}
                    JSONParser mJSONParser = new JSONParser();
            		String ss = null;
            		String encodedvalue = null;
            		try {
            			//ss = mJSONParser.execute("http://api.pearson.com/v2/dictionaries/entries?headword="+text.get(0)+"&apikey=6pUM7idZK2khzpx31xSfUoUapA2wQbzm").get();
            		String word = text.get(0).toString();
            		
            		encodedvalue = Uri.encode(word);
            		   ss=mJSONParser.execute("http://10.98.5.161:4000/"+encodedvalue).get();
            		   //valueTV.setText("Data:"+ ss +"\n\n\n" );
            		   String isValue = valueTV.getText().toString();
            		 //  if(ss.length() < 1)
            		   {
            			// ss = "I can not handle this Question now.";
            		   }
	                   valueTV.setText(valueTV.getText() + ss);
	  //                 int result = tts.setLanguage(Locale.US);
	    //               tts.setSpeechRate(1); // set speech speed rate
	      //     		tts.speak("hello", TextToSpeech.QUEUE_FLUSH, null);
                        //talkit tlk=new talkit();
                        //tlk.speakOut();
                 
	               //    AndroidTextToSpeechActivity tlk=new AndroidTextToSpeechActivity();
                 // tlk.speakOut();
  } catch (InterruptedException e) {
            			// TODO Auto-generated catch block
            			e.printStackTrace();
            		} catch (ExecutionException e) {
            			// TODO Auto-generated catch block
            			e.printStackTrace();
            		}
            		
                    
                chatcontainer.addView(valueTV);
            }
            break;
        }
 
        }
    }
}
