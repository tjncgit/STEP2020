// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.gson.Gson;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.FetchOptions;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
  private ArrayList<String> comments;
  private DatastoreService datastore;

  @Override
  public void init() {
    comments = new ArrayList<String>();
    datastore = DatastoreServiceFactory.getDatastoreService();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    int max = maxComments(request);

    Query query = new Query("Comment").addSort("timestamp", SortDirection.DESCENDING);

    PreparedQuery results = datastore.prepare(query);

    ArrayList<String> commentList = new ArrayList<String>();
    for (Entity commentEntity : results.asIterable()) {
      String comment = (String) commentEntity.getProperty("comment");
      commentList.add(comment);
      String email = (String) commentEntity.getProperty("email");
      comments.add(email + ":\n" + "\n  " + comment);
    }

    String json = convertToJsonUsingGson(commentList);
    response.setContentType("application/json");
    response.getWriter().println(json);
  }

@Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get the input from the form.
    UserService userService = UserServiceFactory.getUserService();
    String userEmail = userService.getCurrentUser().getEmail();
    int max = maxComments(request);
    String text = getParameter(request, "input-comment", "");

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Entity commentEntity = new Entity("Comment");
    commentEntity.setProperty("comment", text);
    commentEntity.setProperty("email", userEmail);
    commentEntity.setProperty("timestamp", System.currentTimeMillis());
    datastore.put(commentEntity);

    // Redirect back to the HTML page.
    response.sendRedirect("/index.html");
  }

  private int maxComments(HttpServletRequest request) throws IOException {
      String maxCommentsString = getParameter(request, "max-comments","");
      int maxComments;
      try {
       maxComments = Integer.parseInt(maxCommentsString);
    } catch (NumberFormatException e) {
        System.err.println("Could not convert to int: " + maxCommentsString);
        return -1;
    }
    return maxComments;
  }


  private String convertToJsonUsingGson(ArrayList<String> commentList) {
    Gson gson = new Gson();
    String json = gson.toJson(commentList);
    return json;
  }

    /**
   * @return the request parameter, or the default value if the parameter
   *         was not specified by the client
   */
  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }
}