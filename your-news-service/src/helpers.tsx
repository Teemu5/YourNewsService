import userService from './services/users'
import Auth from '@aws-amplify/auth';

const chooseCategory = async (names: string[]) => {
    // Update users selections
    if (Auth.Credentials.Auth.user) {
      const email = Auth.Credentials.Auth.user.attributes.email
      let usersbefore = await userService.getAll()
      usersbefore = usersbefore.filter((u: { userEmail: any; }) => u.userEmail === email)
      if (usersbefore.length < 1){
        // if there is no user add it
        const user = {userEmail: email, categories: names}
        userService.create(user)
      } else {
        usersbefore[0].categories = names
        userService.update(usersbefore[0].id, usersbefore[0])
      }
    }
  }
const getCategoriesForCurrentUser = async () => {
      let users = await userService.getAll()
      // If user is logged in
      if (Auth.Credentials.Auth.user) {
        const email = Auth.Credentials.Auth.user.attributes.email
        users = users.filter((u: { userEmail: any; }) => u.userEmail === email)
        if (users.length > 0){
          return users[0].categories
        }
      } else {
          // If no user is logged
          return []
      }
  }
  const getUserCountForCategory = async (category: string) => {
      // Get how many users have selected the category
    let users = await userService.getAll()
    users = users.filter((u: { categories: any[]; }) => u.categories.some((c: string) => c === category))
    const count: number = users.length
    return count
    }
  const getCategoriesUserCount = (categories: string[]) => {
    // Get how many users have selected each category

    let categoriesCount = categories.map(async c => (await getUserCountForCategory(c)))
    console.log(categoriesCount)
    return categoriesCount
    }

export { chooseCategory, getCategoriesForCurrentUser, getCategoriesUserCount }