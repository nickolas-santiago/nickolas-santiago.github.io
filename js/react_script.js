var HeaderComponent = React.createClass(
{
    render: function()
    {   
        return(
            <div id="header_component">
                <h2 id="name">knicksantiago@gmail.com</h2>
                <div id="header_nav_bar">
                    <p className="nav_bar_button"><a href="#projects_component">PROJECTS</a></p>
                    <p className="nav_bar_button">RESUME</p>
                    <p className="nav_bar_button"><a href="#about_me_component">ABOUT ME</a></p>
                    <p className="nav_bar_button"><a href="#contact_component">CONTACT</a></p>
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
                
                <h1 id="my_name">nickolas<br/>santiago</h1>
                <p>&#60;Front-End Web Developer&#62;</p>
            </div>
        );
    }
});

var SkillComponent = React.createClass(
{
    render: function()
    {
        
        return(
            <div className="skill_component">
                <p className="skill_component_description">{this.props.skill}</p>
            </div>
        );
    }
});
var SkillsWrapperComponent = React.createClass(
{
    render: function()
    {
        var knick = ["k","nn", "jklolol'"];
        
        var skill_descriptions = ["translating designs and ideas into clean functioning code", 
            "developing rich and responsive web experiences",
            "creating engaging data visualizations",
            "familiarity with various libraries and frameworks",
            "using APIs and applying external data",
            "basic understanding and use of Unity with C#"
        ];
        
        
        
        console.log(knick);
        var skill_list = skill_descriptions.map(function(skill_, i)
        {
            return(
                <li className="skill_list_item" key={i} index={i}>{skill_}</li>
            );
        });
        return(
            <div id="skills_component" className="component">
                <h2 className="component_title">Skills</h2>
                <div  id="skills_component_wrapper" className="wrapper">
                    <ul id="skill_list">
                        {skill_list}
                    </ul>
                </div>
                <div className="dividing_line">
                </div>
            </div>
        );
    }
});
var SkillsComponent = React.createClass(
{
    render: function()
    {
        return(
            <div id="skills_component" className="component">
                <h2 className="component_title">Skills</h2>
                <div  id="skills_component_wrapper" className="wrapper">
                    <div className="skill_group">
                        <div className="a_skill">
                            <img src="images/thumbnail_web_dev.png"  className="skill_thumbnail"/>
                            <p className="skill_title">Basic Web Development/Canvas</p>
                        </div>
                        <div className="a_skill">
                            <img src="images/thumbnail_jquery.png" className="skill_thumbnail"/>
                            <p className="skill_title">jQuery</p>
                        </div>
                        <div className="a_skill">
                            <img src="images/thumbnail_ajax.png" className="skill_thumbnail"/>
                            <p className="skill_title">Asynchronous JavaScript And XML</p>
                        </div>
                        <div className="a_skill">
                            <img src="images/thumbnail_d3.png" className="skill_thumbnail"/>
                            <p className="skill_title">d3.js</p>
                        </div>
                    </div>
                    <div className="skill_group">
                        <div id="theskill" className="a_skill">
                            <img src="images/thumbnail_react.png" className="skill_thumbnail"/>
                            <p className="skill_title">React.js</p>
                        </div>
                        <div className="a_skill">
                            <img src="images/thumbnail_unity.png" className="skill_thumbnail"/>
                            <p className="skill_title">Unity</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var ProjectComponent = React.createClass(
{
    render: function()
    {
        return(
            <div className="project_">
                <div className="project_thumbnail"></div>
            </div>
        );
    }
});
var Project_Component = React.createClass(
{
    render: function()
    {
        return(
            <div className="project_">
                <p className="project_title">{this.props.projects.name}</p>
                <div className="project_thumbnail"></div>
                <p>{this.props.projects.languages}</p>
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
    componentWillMount: function()
    {
        this.setState(function(state)
        {
            return{
                my_projects: a_project_list.projects
            }
        });
    },
    componentDidMount: function()
    {
        var self = this;
        $(".project_").click(function()
        {
            var selected_project_index = $(".project_").index(this);
            self.props.action(selected_project_index);
        });
        
        
        $(".project_thumbnail").each(function(i)
        {
            $(this).height($(this).width());
            $(this).css({'background-image': 'url(' + self.state.my_projects[i].imgs[0].src + ')'});
        });
        
        $(".project_").each(function()
        {
            console.log($(this).css("margin-top"));
            console.log($(this).css("margin-left"));
        });
        
        /*var xx = 0;
        $(".project_title").each(function()
        {
            if($(this).height() > xx)
            {
                xx = $(this).height();
            }
        });
        $(".project_title").each(function()
        {
            if($(this).height() != xx)
            {
                var diff = (xx - $(this).height());
                $(this).css("margin-top", diff);
            }
        });*/
    },
    render: function()
    {
        var self = this;
        var projectlist = this.state.my_projects.map(function(project, i)
        {
            return(
                <ProjectComponent key={i} projects={project} index={i}/>
            );
        });
        
        return(
            <div id="projects_component" className="component">
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
        $(".idk").click(function()
        {
            var index = $(".idk").index(this);
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
        var img_icons = a_project_list.projects[this.props.project].imgs.map(function(img, i)
        {
            if(i == self.state.my_project_img)
            {
                return(
                    <div className="idk" id="selected"></div>
                )
            }
            else
            {
                return(
                    <div className="idk" onClick={this.onImageThumbnailClick}></div>
                )
            }
        });
        var blurbs = a_project_list.projects[this.props.project].description.map(function(blurb, i)
        {
            return(
                <p key={i} className="project_blurb" className="blurb">{a_project_list.projects[self.props.project].description[i]}</p>
            );
        });
        return(
            <div id="project_page_wrapper" onClick={this.onImageThumbnailClick}>
                <img id="back_button_icon" src="../images/back_button_icon.png"/>
                <h2 id="project_page_name">{a_project_list.projects[this.props.project].name}</h2>
                <div className="wrapper">
                    <img id="project_page_img" src={a_project_list.projects[this.props.project].imgs[this.state.my_project_img].src}/>
                    <div id="img_icon_wrapper">
                        {img_icons}
                    </div>
                    {blurbs}
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
            project_wrapper_component_state: "project_list",
            selected_project: ""
            
        }
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
            rendered_component = <ProjectListComponent action={this.renderProjectPageComponent}/>;
        }
        else if(this.state.project_wrapper_component_state == "project_page")
        {
            console.log(this.state.selected_project);
            rendered_component = <ProjectPageComponent project={this.state.selected_project} action={this.renderProjectListComponent}/>;
        }
        console.log("i rendered");
        return(
            <div>
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
                <img id="about_me_photo" src="me.jpg"/>
                <div id="about_me_content">
                    <p className="about_me_blurb" className="blurb">Hey! My name is Nickolas Santiago. I'm a front-end developer based
                       out of the Bronx, NY and I like to make fun and engaging interactive experiences. I studied
                       new media interactive development up at Rochester Institute of Technology. My specialty
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
                    <p><u>Email:</u> knicksantiago@gmail.com</p>
                    <p><a href="https://www.linkedin.com/in/nickolas-santiago/">LinkedIn</a></p>
                    <p><a href="https://github.com/nickolas-santiago">Github</a></p>
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
                <p>&#169; Developed by Nickolas Santiago. 2018.</p>
            </div>
        );
    }
});


var PortfolioComponent = React.createClass({
    render: function(){
        return(
            <div>
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
    document.getElementById('portfolio')
);