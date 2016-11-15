package com.trows.labmag.common.filter;


import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.UUID;

/**
 * 登入拦截器极其token的添加
 */

@WebFilter(filterName = "loginFilter", urlPatterns = {"*.jsp", "*.do", "*.htm"},
        dispatcherTypes = {
                DispatcherType.FORWARD,
                DispatcherType.INCLUDE,
                DispatcherType.REQUEST,
                DispatcherType.ERROR, DispatcherType.ASYNC
        }
)
public class LoginFilter implements Filter {

    public void init(FilterConfig filterConfig) throws ServletException {
    }

    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
                         FilterChain filterChain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        response.setCharacterEncoding("UTF-8");
        request.setCharacterEncoding("UTF-8");
        servletRequest.setCharacterEncoding("UTF-8");
        HttpSession session = request.getSession(true);
        String requestPath = request.getServletPath();
        if (session.getAttribute("token") == null) {
            String token = UUID.randomUUID().toString();
            session.setAttribute("token", token);
        }
        if (session.getAttribute("user_name") == null
                && !requestPath.endsWith("/index.jsp")
                && !requestPath.endsWith("/loginCheck.htm")
                ) {
            if (requestPath.endsWith(".do")) {
                response.getOutputStream().write("logout".getBytes());      //用户未登陆，对于数据请求做驳回响应
            } else {
                String path = request.getContextPath();
                String basePath = request.getScheme() + "://" + request.getServerName() +
                        ":" + request.getServerPort() + path + "/";
                response.sendRedirect(basePath + "/index/index.jsp?return_code=300");     //用户未登入返回系统登录界面
            }
        } else {
            filterChain.doFilter(servletRequest, servletResponse);   //放行
        }
    }

    public void destroy() {

    }
}
