export default defineAppConfig({
    ui: {
      primary: 'navy',
      button: {
        padding: {
          lg: 'px-7 py-2',
          xl: 'px-8 py-3'
        },
        square: {
          xl: 'p-[18px]'
        },
        color: {
          white: {
            solid: 'shadow-none hover:bg-white'
          }
        },
        variant: {
          solid: 'shadow-none bg-primary-700'
        }
      },
      buttonGroup: {
        shadow: 'shadow-none',
        rounded: 'rounded-xl'
      },
      input: {
        base: 'font-medium disabled:opacity-100',
        rounded: 'rounded-xl',
        label: {
          wrapper: 'flex content-center items-center justify-between',
          base: 'block font-medium text-primary-700',
          required: "after:content-['*'] after:ms-0.5 after:text-red-500 dark:after:text-red-400",
        },
        size: {
          '2xs': 'text-xs',
          xs: 'text-xs',
          sm: 'text-sm',
          md: 'text-sm',
          lg: 'text-sm',
          xl: 'text-sm',
        },
        padding: {
          xl: 'px-4 py-4'
        },
        container: 'mt-1 relative',
        description: 'text-gray-500 dark:text-gray-400',
        hint: 'text-gray-500 dark:text-gray-400',
        help: 'mt-2 text-gray-500 dark:text-gray-400',
        error: 'mt-2 text-red-500 dark:text-red-400',
        default: {
          size: 'lg'
        },
        color: {
          white: {
            outline: 'shadow-none text-primary focus:ring-1'
          }
        },
        icon: {
          base: 'text-grayscale-300',
          size: {
            lg: 'h-6 w-6'
          },
          leading: {
            padding: {
              lg: 'px-2.5'
            },
          },
        },
        placeholder: 'placeholder-grayscale-400',
      },    
      inputMenu: {
        base: 'pt-[10px] -mt-[10px]',
        height: 'max-h-fit',
        rounded: 'rounded-t-none rounded-b-xl',
        padding: 'p-0',
        shadow: 'shadow-none',
        ring: 'ring-1 ring-primary',
        option: {
          rounded: 'rounded-none',
          color: 'text-navy-700',
          padding: 'px-4 py-4',
          empty: 'hidden',
          active: 'bg-primary-600/10',
        },
        selectedIcon: {
          wrapper: 'absolute inset-y-0 end-0 flex items-center',
          padding: 'pe-2',
          base: 'h-5 w-5 text-gray-900 dark:text-white flex-shrink-0'
        },
      },
      textarea: {
        wrapper: 'relative',
        base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0',
        form: 'form-textarea',
        rounded: 'rounded-xl',
        placeholder: 'placeholder-gray-400 dark:placeholder-gray-500',
        file: {
          base: 'file:cursor-pointer file:rounded-l-md file:absolute file:left-0 file:inset-y-0 file:font-medium file:m-0 file:border-0 file:ring-1 file:ring-gray-300 dark:file:ring-gray-700 file:text-gray-900 dark:file:text-white file:bg-gray-50 hover:file:bg-gray-100 dark:file:bg-gray-800 dark:hover:file:bg-gray-700/50',
          padding: {
            '2xs': 'ps-[85px]',
            xs: 'ps-[87px]',
            sm: 'ps-[96px]',
            md: 'ps-[98px]',
            lg: 'ps-[100px]',
            xl: 'ps-[109px]',
          },
        },
        size: {
          '2xs': 'text-xs',
          xs: 'text-xs',
          sm: 'text-sm',
          md: 'text-sm',
          lg: 'text-sm',
          xl: 'text-sm',
        },
        gap: {
          '2xs': 'gap-x-1',
          xs: 'gap-x-1.5',
          sm: 'gap-x-1.5',
          md: 'gap-x-2',
          lg: 'gap-x-2.5',
          xl: 'gap-x-2.5',
        },
        padding: {
          '2xs': 'px-2 py-1',
          xs: 'px-2.5 py-1.5',
          sm: 'px-2.5 py-1.5',
          md: 'px-3 py-2',
          lg: 'px-3.5 py-2.5',
          xl: 'px-4 py-4',
        },
        leading: {
          padding: {
            '2xs': 'ps-7',
            xs: 'ps-8',
            sm: 'ps-9',
            md: 'ps-10',
            lg: 'ps-11',
            xl: 'ps-12',
          },
        },
        trailing: {
          padding: {
            '2xs': 'pe-7',
            xs: 'pe-8',
            sm: 'pe-9',
            md: 'pe-10',
            lg: 'pe-11',
            xl: 'pe-12',
          },
        },
        color: {
          white: {
            outline: 'shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
          },
          gray: {
            outline: 'shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
          },
        },
        variant: {
          outline: 'shadow-sm bg-transparent text-gray-900 dark:text-white ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400 focus:ring-2 focus:ring-{color}-500 dark:focus:ring-{color}-400',
          none: 'bg-transparent focus:ring-0 focus:shadow-none',
        },
        icon: {
          base: 'flex-shrink-0 text-gray-400 dark:text-gray-500',
          color: 'text-{color}-500 dark:text-{color}-400',
          loading: 'animate-spin',
          size: {
            '2xs': 'h-4 w-4',
            xs: 'h-4 w-4',
            sm: 'h-5 w-5',
            md: 'h-5 w-5',
            lg: 'h-5 w-5',
            xl: 'h-6 w-6',
          },
          leading: {
            wrapper: 'absolute inset-y-0 start-0 flex items-center',
            pointer: 'pointer-events-none',
            padding: {
              '2xs': 'px-2',
              xs: 'px-2.5',
              sm: 'px-2.5',
              md: 'px-3',
              lg: 'px-3.5',
              xl: 'px-3.5',
            },
          },
          trailing: {
            wrapper: 'absolute inset-y-0 end-0 flex items-center',
            pointer: 'pointer-events-none',
            padding: {
              '2xs': 'px-2',
              xs: 'px-2.5',
              sm: 'px-2.5',
              md: 'px-3',
              lg: 'px-3.5',
              xl: 'px-3.5',
            },
          },
        },
        default: {
          size: 'lg',
          color: 'white',
          variant: 'outline',
        },
      },      
      formGroup: {
        label: {
          base: 'text-base text-grayscale-700',
          required: "after:content-['*'] after:ms-0.5 after:text-grayscale-700"
        },
      }, 
      select: {
        rounded: 'rounded-xl',
        size: {
          xl: 'text-sm',
        },
        padding: {
          xl: 'px-4 py-4'
        },
        color: {
          white: {
            outline: 'shadow-none text-primary-700'
          }
        }
      },
      popover: {
        shadow: 'shadow-none',
        ring: 'ring-primary-700',
      },
      toggle: {
        active: 'bg-primary-700',
      },
      range: {
        progress: {
          background: 'bg-primary-700',
        },
        thumb: {
          background: '[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:bg-white',
          color: 'text-white',
          ring: '[&::-webkit-slider-thumb]:ring-4 [&::-webkit-slider-thumb]:ring-primary-700',
        },
      },
      modal: {
        wrapper: 'relative z-[70]',
        inner: 'fixed inset-0 overflow-y-auto',
        container: 'flex min-h-full items-end sm:items-center justify-center text-center',
        padding: 'p-4 sm:p-0',
        margin: 'sm:my-8',
        base: 'relative text-left rtl:text-right flex flex-col',
        overlay: {
          base: 'fixed inset-0 transition-opacity',
          background: 'bg-primary-900/80 dark:bg-gray-800/75',
          transition: {
            enter: 'ease-out duration-300',
            enterFrom: 'opacity-0',
            enterTo: 'opacity-100',
            leave: 'ease-in duration-200',
            leaveFrom: 'opacity-100',
            leaveTo: 'opacity-0',
          },
        },
        background: '',
        ring: '',
        rounded: 'rounded-lg',
        shadow: '',
        width: 'w-full sm:max-w-lg',
        height: '',
        fullscreen: 'w-screen h-screen',
        transition: {
          enter: 'ease-out duration-300',
          enterFrom: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
          enterTo: 'opacity-100 translate-y-0 sm:scale-100',
          leave: 'ease-in duration-200',
          leaveFrom: 'opacity-100 translate-y-0 sm:scale-100',
          leaveTo: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
        },
      },
      notification: {
        title: 'text-white',
        ring: 'ring-0',
        background: 'bg-success-400',
        icon: {
          color: 'text-white',
        },
        progress: {
          // base: 'absolute bottom-0 end-0 start-0 h-1',
          background: 'bg-transparent',
        },
        default: {
          closeButton: {
            color: 'gray',
          }
        }
      },
      notifications: {
        // Show toasts at the top right of the screen
        position: 'top-14 lg:top-28 bottom-auto'
      },
      card: {
        rounded: 'rounded'
      },  
    }
  })