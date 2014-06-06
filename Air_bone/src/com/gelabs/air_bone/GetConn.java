package com.gelabs.air_bone;

import java.io.IOException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONObject;

public class GetConn {
 
	public JSONObject getConn(String URL)
	{
		
	     HttpClient httpclient = new DefaultHttpClient();
         try {
			JSONObject jb = (JSONObject) httpclient.execute(new HttpGet(URL));
			return jb;
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
    
	}
}
