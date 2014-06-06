package com.gelabs.air_bone;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONObject;

import android.os.AsyncTask;
import android.util.Log;

public class JSONParser extends AsyncTask <String, Void, String>{

    static InputStream is = null;

static JSONObject jObj = null;
static String json = "";

// constructor
public JSONParser() {

}
@Override
protected String doInBackground(String... params) {


    // Making HTTP request
	try {
        // defaultHttpClient
        DefaultHttpClient httpClient = new DefaultHttpClient();
        HttpGet httpPost = new HttpGet(params[0]);

    HttpResponse getResponse = httpClient.execute(httpPost);
   final int statusCode = getResponse.getStatusLine().getStatusCode();

   if (statusCode != HttpStatus.SC_OK) { 
      Log.w(getClass().getSimpleName(), 
          "Error " + statusCode + " for URL " + ""); 
      return null;
   }

    HttpEntity getResponseEntity = getResponse.getEntity();
    is = getResponseEntity.getContent();            

    } catch (UnsupportedEncodingException e) {
        e.printStackTrace();
    } catch (ClientProtocolException e) {
        e.printStackTrace();
    } catch (IOException e) {
        Log.d("IO", e.getMessage().toString());
        e.printStackTrace();

    }

	try 
	{
		BufferedReader reader = new BufferedReader(new InputStreamReader(is, "iso-8859-1"), 8);
	StringBuilder sb = new StringBuilder();
	String line = null;
	while ((line = reader.readLine()) != null)
	{
	    sb.append(line + "\n");
		}
		is.close();
		json = sb.toString();
	} 
	catch (Exception e) 
	{
	    Log.e("Buffer Error", "Error converting result " + e.toString());
	}
    return json;
}
protected void onPostExecute(String page)
{   
    //onPostExecute
}   
}