module.exports = function(grunt) {
	require('time-grunt')(grunt);

	// Load required
	require('load-grunt-tasks')(grunt);
	// grunt.loadNpmTasks('grunt-notify');
//grunt.loadNpmTasks('grunt-contrib-clean');
//grunt.loadNpmTasks('grunt-contrib-copy');
//grunt.loadNpmTasks('grunt-spritesmith');
//grunt.loadNpmTasks('grunt-svgstore');
//grunt.loadNpmTasks('grunt-svg2string');
//grunt.loadNpmTasks('grunt-contrib-imagemin');
//grunt.loadNpmTasks('grunt-contrib-concat');
//grunt.loadNpmTasks('grunt-contrib-uglify');
//grunt.loadNpmTasks('grunt-include-replace');
//grunt.loadNpmTasks('grunt-prettify');
////grunt.loadNpmTasks('grunt-sass');
//grunt.loadNpmTasks('grunt-csscomb');
//grunt.loadNpmTasks('grunt-postcss');
//grunt.loadNpmTasks('grunt-cssnano');
//grunt.loadNpmTasks('grunt-uncss');
//grunt.loadNpmTasks('grunt-contrib-sass');
//grunt.loadNpmTasks('grunt-contrib-watch');
//grunt.loadNpmTasks('grunt-newer');
//grunt.loadNpmTasks('time-grunt');
//grunt.loadNpmTasks('grunt-browser-sync');

// Project configuration.
	grunt.initConfig({

		clean: {
			src: ['src'],
			fonts: ['src/fonts/*'],
			imgs: ['src/imgs/**/*']
		},

		copy: {
			fonts: {
				expand: true,
				cwd: 'dist/fonts/',
				src: ['**'],
				dest: 'src/fonts/'
			}
		},

		includereplace: {
			dist: {
				options: {
					globals: {
						link_css: 'main.min.css',
						var2: 'two',
						var3: 'three'
					}
				},
				files: [{
					expand: true,
					cwd: 'dist/',
					src: ['*.html'],
					dest: 'src/'
				}]
			}
		},

		prettify: {
			options: {
				indent: 1,
				indent_char: '\t',
				wrap_line_length: 110
			},
			html: {
				expand: true,
				cwd: 'src/',
				ext: '.html',
				src: ['*.html'],
				dest: 'src/'
			}
		},

		sprite:{
			options: {
				padding: 15
			},
			all: {
				src: 'dist/imgs/png-sprite/*.png',
				dest: 'dist/imgs/png-sprite.png',
				destCss: 'dist/sass/png-sprite.sass'
			}
		},

		svgstore: {
			options: {
				prefix : 'icon-'
			},
			default : {
				files: {
					'dist/imgs/svg/svg-sprite.svg': ['dist/imgs/svg-sprite/*.svg']
				}
			}
		},

		svg2string: {
			elements: {
				files: {
					'dist/js/svg-sprite.js': ['dist/imgs/svg/svg-sprite.svg']
				}
			}
		},

		imagemin: {
			images: {
				options: {
					optimizationLevel: 3
				},
				files: [{
					expand: true,
					cwd: 'dist/imgs/',
					src: ['**/*.{png,jpg,gif,svg}', '!png-sprite/*.png', '!svg-sprite/*.svg', '!svg/**/*.svg'],
					dest: 'src/imgs/'
				}]
			},

			svg: {
				files: [{
					expand: true,
					cwd: 'dist/imgs/svg/',
					src: ['**/*.svg'],
					dest: 'src/imgs/svg-min/'
				}]
			}
		},

		concat: {
			options: {
				separator: ';',
				sourceMap: true
			},
			dist: {
				src: [
					'dist/js/lib/jquery-3.0.0.js',
					'dist/js/svg-sprite.js',
					'dist/js/include-svg-sprite.js',
					'dist/js/card-selected-hover.js'
				],
				dest: 'src/js/main.js'
			}
		},

		uglify: {
			options: {
				sourceMap: true,
				sourceMapIncludeSources: true
			},

			dist: {
				src: 'src/js/main.js',
				dest: 'src/js/main.min.js'
			}
		},

		csscomb: {
			options: {
				config: '.csscomb.json'
			},
			files: {
				expand: true,
				cwd: 'dist/sass/',
				src: ['**/*.scss', '!bootstrap_3/**/*.scss', '!variables.scss'],
				dest: 'dist/sass/'
			}
		},

		sass: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'src/css/main.css': 'dist/sass/main.scss'
				}
			}
		},

		postcss: {
			dev: {
				options: {
					map: true,
					//map: false,
					processors: [
						require('autoprefixer')({
							browsers: ['last 10 versions']
						}),
						require('css-mqpacker')({sort: true}),
						require('postcss-discard-duplicates'),
						require('postcss-discard-empty'),
						require('postcss-discard-overridden'),
						require('postcss-discard-unused'),
						require('postcss-merge-idents'),
						require('postcss-merge-longhand'),
						require('postcss-merge-rules'),
						require('postcss-uncss')({
							html: ['src/*.html']
							// ignore: ['.fade']
						})
					]
				},
				dist: {
					src: 'src/css/main.css'
				}
			},
			prod: {
				options: {
					map: true,
					//map: false,
					processors: [
						require('cssnano')()
					]
				},
				files: {
					'src/css/main.min.css': 'src/css/main.css'
				}
			}
		},

		browserSync: {
			dev: {
				bsFiles: {
					src : [
						'src/css/**/*.css',
						'src/**/*.html',
						'src/js/*.js'
					]
				},
				options: {
					watchTask: true,
					server: {
						baseDir: './',
						directory: true
					},
					ghostMode: {
						clicks: true,
						forms: true,
						scroll: false
					},
					open: false
					// tunnel: true
				}
			}
		},

		notify: {
			options: {
				enabled: true,
				success: false,
				duration: 5
			}
		},
//
		watch: {
			configFiles: {
				files: ['Gruntfile.js'],
				tasks:['start:dev'],
				//tasks:['start:prod'],
				options: {
					reload: true
				}
			},

			fonts: {
				files: ['dist/fonts/**/*'],
				tasks: ['clean:fonts', 'copy']
			},

			img: {
				files: ['src/imgs/**/*.{png,jpg,gif}', 'dist/imgs/svg/*'],
				tasks: ['clean:imgs', 'imagemin']
			},

			pngsprite: {
				files: ['dist/imgs/png-sprite/*'],
				tasks: ['sprite', 'imagemin']
			},

			svgsprite: {
				files: ['dist/imgs/svg-sprite/*'],
				tasks: ['svgstore', 'svg2string', 'newer:concat', 'uglify', 'imagemin:svg']
			},

			html: {
				files: ['dist/*.html', 'dist/components/**/*.html'],
				tasks: ['includereplace', 'newer:prettify']
			},

			sass: {
				files: ['dist/sass/**/*.scss', 'variables.scss'],
				tasks: ['sass', 'postcss:dev', 'postcss:prod'],

				options: {
					spawn: false
				}
			},

			js: {
				files: ['dist/js/*.js'],
				tasks: ['newer:concat', 'newer:uglify'],
				options: {
					spawn: false
				}
			}
		}
	});

//
	grunt.registerTask('start:dev', ['clean:src', 'includereplace', 'prettify',
		'copy', 'svgstore', 'imagemin', 'svg2string', 'newer:concat', 'uglify', 'sass', 'postcss:dev', 'postcss:prod',
		'browserSync', 'watch'
	]);
};