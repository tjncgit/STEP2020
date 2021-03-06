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
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/logout")
public class Logout extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException{
        response.setContentType("text/html");
        UserService userService = UserServiceFactory.getUserService();

        if (userService.isUserLoggedIn()) {
            String urlToRedirectToAfterUserLogsOut = "/logout";
            String logoutUrl = userService.createLogoutURL(urlToRedirectToAfterUserLogsOut);
            response.sendRedirect(logoutUrl);
        } else {
            String urlToLogin = "/Users";
            String home = "/index.html";
            String loginURL = userService.createLoginURL(urlToLogin);
            response.getWriter().println("<p> You have been logged out</p></br></br>");
            response.getWriter().println("<p> Login <a href=\"" + loginURL + "\">here</a> </p> <br>");
            response.getWriter().println("<p> Return to <a href=\"" + home + "\">Portfolio Page</a></p>");
        }
  } 
}
