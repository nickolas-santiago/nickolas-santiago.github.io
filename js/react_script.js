var HeaderComponent = React.createClass(
{
    componentDidMount: function()
    {
        $('#nav_bar_reveal_icon').click(function()
        {
            $(this).toggleClass('open');
            if($("#header_nav_bar").css("display") == "none")
            {
                $("#header_nav_bar").css("display", "block");
            }
            else
            {
                $("#header_nav_bar").css("display", "none");
            };
        });
        $(".nav_bar_button").on("click",function()
        {
            if($('#nav_bar_reveal_icon').css("display") != "none")
            {
                $('#nav_bar_reveal_icon').toggleClass('open');
                $("#header_nav_bar").css("display", "none");
            }
        });
    },
    render: function()
    {
        return(
            <div id="header_component">
                <h2 id="name">knicksantiago@gmail.com</h2>
                <div id="nav_bar_reveal_icon">
                    <span className="bar"></span><span className="bar"></span><span className="bar"></span>
                </div>
                <div id="header_nav_bar">
                    <h3 className="nav_bar_button"><a href="#skills_component">SKILLS</a></h3>
                    <h3 className="nav_bar_button"><a href="#projects_component">PROJECTS</a></h3>
                    <h3 className="nav_bar_button"><a href="/Nickolas Santiago - Resume.pdf" target="_blank">RESUME</a></h3>
                    <h3 className="nav_bar_button"><a href="#about_me_component">ABOUT ME</a></h3>
                    <h3 className="nav_bar_button"><a href="#contact_component">CONTACT</a></h3>
                </div>
            </div>
        );
    }
});
var HomeComponent = React.createClass(
{
    render: function()
    {
        return(
            <div id="home_component">
                <div id="home_component_content">
                    <h1>NICKOLAS<br/>SANTIAGO</h1>
                    <h2>&#60;Front-End Web Developer&#62;</h2>
                </div>
            </div>
        );
    }
});
var SkillsWrapperComponent = React.createClass(
{
    render: function()
    {
        var skill_descriptions = ["translating designs and ideas into clean functioning code", 
            "developing rich and responsive web experiences",
            "creating engaging data visualizations",
            "familiarity with various libraries and frameworks",
            "using APIs and applying external data",
            "basic understanding and use of Unity with C#"
        ];
        var skill_list = skill_descriptions.map(function(skill_, i)
        {
            return(
                <li className="skill_list_item" key={i} index={i}><span className="fa-li"><i className="fas fa-code"></i></span>{skill_}</li>
            );
        });
        return(
            <div id="skills_component" className="component">
                <h2 className="component_title">Skills</h2>
                <div  id="skills_component_wrapper" className="wrapper">
                    <div id="skills_icons">
                        <img className="skill_icon" src="media/skillicon_a.png"/>
                        <img className="skill_icon" src="media/skillicon_react.png"/>
                        <img className="skill_icon" src="media/skillicon_d3.png"/>
                    </div>
                    <div id="skill_list_wrapper">
                        <ul id="skill_list" className="fa-ul">
                            {skill_list}
                        </ul>
                    </div>
                </div>
                <div className="dividing_line">
                </div>
            </div>
        );
    }
});
var ProjectListComponent = React.createClass(
{
    getInitialState: function()
    {
        return{
            my_projects: []
        }
    },
    componentDidMount: function()
    {
        var self = this;
        $(".project_thumbnail").click(function()
        {
            var selected_project_index = $(".project_thumbnail").index(this);
            self.props.action(selected_project_index);
            window.location = "#projects_component";
            return false;
        });
        $(".project_thumbnail").each(function(i)
        {
            $(this).css({'background-image': 'url(' + self.props.projects.projects[i].thumbnail + ')'});
        });
    },
    render: function()
    {
        var self = this;
        var projectlist;
        if(this.props.projects.projects)
        {
            projectlist = this.props.projects.projects.map(function(project, i)
            {
                return(
                    <div className="project_thumbnail" key={i} projects={project} index={i}></div>
                );
            });
        }
        return(
            <div>
                <h2 className="component_title">Projects</h2>
                <div id="projects_wrapper" className="wrapper">
                    {projectlist}
                </div>
            </div>
        );
    }
});
var ProjectPageComponent = React.createClass(
{
    getInitialState: function()
    {
        return{
            my_project_img: 0
        }
    },
    componentDidMount: function()
    {
        var self = this;
        var p_img = document.getElementById("project_page_img");
        p_img.onload = function()
        {
            if(p_img.naturalHeight >= p_img.naturalWidth)
            {
                $("#project_page_img").addClass("project_page_img_portrait");
            }
            else
            {
                $("#project_page_img").addClass( "project_page_img_landscape" );
            }
        }
        $(".image_selection_icon").click(function()
        {
            var index = $(".image_selection_icon").index(this);
            self.setState(function(state)
            {
                return{
                    my_project_img: index
                }
            });
        });
        $("#back_button_icon").click(function()
        {
            self.props.action();
        });
    },
    render: function()
    {
        var self= this;
        var img_icons = this.props.projects.projects[this.props.project].imgs.map(function(img, i)
        {
            if(i == self.state.my_project_img)
            {
                return(
                    <div className="image_selection_icon" id="selected" key={i}></div>
                )
            }
            else
            {
                return(
                    <div className="image_selection_icon"key={i}></div>
                )
            }
        });
        var blurbs = this.props.projects.projects[this.props.project].description.map(function(blurb, i)
        {
            return(
                <p key={i} className="project_blurb" className="blurb">{self.props.projects.projects[self.props.project].description[i]}</p>
            );
        });
        return(
            <div id="project_page_wrapper">
                <div id="gg">
                <i className="fa fa-caret-square-o-left" id="back_button_icon"></i>
                <h2 className="component_title">{this.props.projects.projects[this.props.project].name}</h2>
                </div>
                <div className="wrapper">
                    <img id="project_page_img" src={this.props.projects.projects[this.props.project].imgs[this.state.my_project_img].src}/>
                    <div id="img_icon_wrapper">
                        {img_icons}
                    </div>
                    {blurbs}
                    <p><a href={this.props.projects.projects[this.props.project].link} target="_blank" className="project_link">{this.props.projects.projects[this.props.project].link_description}</a></p>
                </div>
            </div>
        );
    }
});
var ProjectsWrapperComponent = React.createClass(
{
    getInitialState: function()
    {
        return{
            my_project_list: [],
            project_wrapper_component_state: "",
            selected_project: ""
        }
    },
    componentDidMount: function()
    {
        var self = this;
        var url = "js/projects.json";
        var xhr = new XMLHttpRequest();
        xhr.open("GET",url,true);
        xhr.send();
        xhr.onload = function()
        {
            var nn = JSON.parse(xhr.responseText);
            self.setState({
                my_project_list: nn,
                project_wrapper_component_state: "project_list"
            });
        };
    },
    renderProjectListComponent: function()
    {
        this.setState(function(state)
        {
            return{
                project_wrapper_component_state: "project_list",
                selected_project: ""
            }
        });
    },
    renderProjectPageComponent: function(project_index)
    {
        this.setState(function(state)
        {
            return{
                project_wrapper_component_state: "project_page",
                selected_project: project_index
            }
        });
    },
    render: function()
    {
        var self = this;
        var rendered_component;
        if(this.state.project_wrapper_component_state == "project_list")
        {
            rendered_component = <ProjectListComponent action={this.renderProjectPageComponent} projects={this.state.my_project_list}/>;
        }
        else if(this.state.project_wrapper_component_state == "project_page")
        {
            rendered_component = <ProjectPageComponent  projects={this.state.my_project_list} project={this.state.selected_project} action={this.renderProjectListComponent}/>;
        }
        return(
            <div id="projects_component" className="component">
                {rendered_component}
                <div className="dividing_line">
                </div>
            </div>
        );
    }
});
var AboutMeComponent = React.createClass(
{
    render: function()
    {
        return(
            <div id="about_me_component" className="component">
                <h2 className="component_title">About Me</h2>
                <div id="about_me_main" className="wrapper">
                    <img id="about_me_img" src="media/me.jpg" />
                    <div id="about_me_content">
                        <p className="about_me_blurb" className="blurb">Hey! My name is Nickolas Santiago. I'm a front-end developer based
                           out of the Bronx, NY and I like to make fun and engaging interactive experiences. I studied
                           New Media Interactive Development up at Rochester Institute of Technology. My specialty
                           is centered around web app development in HTML, CSS, and JavaScript with experience in various
                           libraries and models. I can however be adaptive and have learned my way around other languages. 
                           I'm also into making small games in Unity.</p>
                        <p className="about_me_blurb" className="blurb">Other hobbies and interests of mine include playing video games,
                           spending every waking hour on the internet, and longboarding (if the weather permits). I have
                           had two Maltese dogs since I was in high school. Another strong interest of mine is theater.
                           I acted all throughout high school and college, and it's always exciting to see a production.</p>
                    </div>
                </div>
                <div className="dividing_line">
                </div>
            </div>
        );
    }
});
var ContactInfoComponent = React.createClass(
{
    render: function()
    {
        return(
            <div id="contact_component" className="component">
                <h2 className="component_title">Contact Information</h2>
                <div id="contact_info_wrapper" className="wrapper">
                    <p id="contact_info_email"><u>Email:</u> knicksantiago@gmail.com</p>
                    <div id="links">
                        <a className="fab fa-linkedin" href="https://www.linkedin.com/in/nickolas-santiago/"></a>
                        <a className="fab fa-github-square" href="https://github.com/nickolas-santiago"></a>
                    </div>
                </div>
            </div>
        );
    }
});
var FooterComponent = React.createClass(
{
    render: function()
    {
        return(
            <div id="footer_component">
                <p>&#169; Developed by Nickolas Santiago. 2019.</p>
            </div>
        );
    }
});
var PortfolioComponent = React.createClass({
    render: function(){
        return(
            <div id="portfolio">
                <HeaderComponent />
                <HomeComponent />
                <SkillsWrapperComponent />
                <ProjectsWrapperComponent/>
                <AboutMeComponent />
                <ContactInfoComponent />
                <FooterComponent />
            </div>
        );
    }
});
React.render(
    <PortfolioComponent />,
    document.querySelector('body')
);